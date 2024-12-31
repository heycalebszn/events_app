
import { generateSessionToken, createSession, setSessionTokenCookie } from "@/lib/server/session";
import { google } from "@/lib/server/oauth";
import { cookies } from "next/headers";
import { createUser, getUserFromGoogleId } from "@/lib/server/user";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { globalGETRateLimit } from "@/lib/server/request";
import { decodeIdToken } from "arctic";

export async function GET(request: Request): Promise<Response> {
  try {
    if (!globalGETRateLimit()) {
      return new Response("Too many requests", { status: 429 });
    }

    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    
    const cookieStore = await cookies();
    const storedState = cookieStore.get("google_oauth_state")?.value;
    const codeVerifier = cookieStore.get("google_code_verifier")?.value;

    if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
      return new Response("Invalid authentication state. Please try again.", {
        status: 400
      });
    }

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    if (!tokens || !tokens.idToken()) {
      throw new Error("Failed to validate authorization code");
    }

    const claims = decodeIdToken(tokens.idToken());
    if (!claims) {
      throw new Error("Failed to decode ID token");
    }

    const parser = new ObjectParser(claims);
    const googleId = parser.getString("sub");
    const name = parser.getString("name");
    const picture = parser.getString("picture");
    const email = parser.getString("email");

    if (!googleId || !email) {
      throw new Error("Missing required user information");
    }

    let user = await getUserFromGoogleId(googleId);
    if (!user) {
      user = await createUser(googleId, email, name, picture);
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    // Clear OAuth cookies
    const response = new Response(null, {
      status: 302,
      headers: {
        Location: "/"
      }
    });

    setSessionTokenCookie(sessionToken, session.expiresAt);
    
    // Clear the OAuth state cookies
    cookieStore.delete("google_oauth_state");
    cookieStore.delete("google_code_verifier");

    return response;

  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return new Response("Authentication failed. Please try again.", {
      status: 500
    });
  }
}