import { prisma } from "@/lib/server/db";
import { v4 as uuidv4 } from "uuid";

export async function getUserFromGoogleId(googleId: string) {
  const oauthAccount = await prisma.oauthAccount.findUnique({
    where: {
      providerId_providerUserId: {
        providerId: "google",
        providerUserId: googleId
      }
    },
    include: {
      user: true
    }
  });

  return oauthAccount?.user || null;
}

export async function createUser(
  googleId: string,
  email: string,
  name: string | null,
  avatarUrl: string | null
) {
  // First check if a user with this email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
      oauthAccount: true
    }
  });

  if (existingUser) {
    // If user exists but doesn't have a Google OAuth account, add it
    if (!existingUser.oauthAccount) {
      await prisma.oauthAccount.create({
        data: {
          providerId: "google",
          providerUserId: googleId,
          userEmail: email,
          userName: name || email.split("@")[0],
          userAvatarURL: avatarUrl || "",
          userId: existingUser.id
        }
      });
    }
    return existingUser;
  }

  // If no user exists, create a new one with all associated data
  const userId = uuidv4();

  const user = await prisma.user.create({
    data: {
      id: userId,
      email: email,
      emailVerified: true,
      profile: {
        create: {
          id: uuidv4(),
          name: name || email.split("@")[0],
          imageUrl: avatarUrl || "",
          email: email
        }
      },
      oauthAccount: {
        create: {
          providerId: "google",
          providerUserId: googleId,
          userEmail: email,
          userName: name || email.split("@")[0],
          userAvatarURL: avatarUrl || ""
        }
      }
    },
    include: {
      profile: true,
      oauthAccount: true
    }
  });

  return user;
}