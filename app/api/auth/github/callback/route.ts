import { generateSessionToken, createSession } from "@/lib/server/session";
import { github } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { createUser, getUserFromGitHubId } from "@/lib/server/user";
import { globalGETRateLimit } from "@/lib/server/request";

export async function GET(request: Request): Promise<Response> {
  try {
    if (!globalGETRateLimit()) {
      return new Response("Too many requests", { status: 429 });
    }

    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieStore = await cookies();
    const storedState = cookieStore.get("github_oauth_state")?.value;

    if (!code || !state || !storedState || state !== storedState) {
      return new Response("Invalid authentication state. Please try again.", {
        status: 400
      });
    }

    const tokens = await github.validateAuthorizationCode(code);
    
    // Fetch user profile
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken()}`,
        'Accept': 'application/json'
      }
    });
    
    const githubUser = await githubUserResponse.json();
    
    // Convert GitHub's numeric ID to string
    const githubId = githubUser.id.toString();
    const name = githubUser.login;
    const avatarUrl = githubUser.avatar_url;

    // Fetch user email
    const emailListResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken()}`,
        'Accept': 'application/json'
      }
    });
    
    const emailListResult = await emailListResponse.json();

    if (!Array.isArray(emailListResult) || emailListResult.length < 1) {
      throw new Error("No email found");
    }

    let primaryEmail: string | null = null;
    for (const emailRecord of emailListResult) {
      if (emailRecord.primary && emailRecord.verified) {
        primaryEmail = emailRecord.email;
        break;
      }
    }

    if (!primaryEmail) {
      throw new Error("No verified primary email found");
    }

    let user = await getUserFromGitHubId(githubId);
    if (!user) {
      user = await createUser("github", githubId, primaryEmail, name, avatarUrl);
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    const headers = new Headers();
    headers.set('Location', '/');
    headers.append('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${session.expiresAt.toUTCString()}`);
    headers.append('Set-Cookie', 'github_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');

    return new Response(null, {
      status: 302,
      headers
    });

  } catch (error) {
    console.error("GitHub OAuth callback error:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown error type'
    });

    return new Response("Authentication failed. Please try again.", {
      status: 500
    });
  }
}