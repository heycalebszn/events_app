import { prisma } from "./db";
import type { User } from "@prisma/client";

// Google authentication functions 
export async function createUser(
  googleId: string,
  email: string,
  name: string,
  picture: string
): Promise<User> {
  const user = await prisma.user.create({
    data: {
      id: googleId, 
      email,
      emailVerified: true,
      profile: {
        create: {
          name,
          imageUrl: picture,
          email
        }
      },
      oauthAccount: {
        create: {
          providerId: 'google',
          providerUserId: googleId,
          userEmail: email,
          userName: name,
          userAvatarURL: picture
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

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: googleId
    },
    include: {
      profile: true,
      oauthAccount: true
    }
  });

  return user;
}

// GitHub authentication functions
export async function createGitHubUser(
  githubId: number,
  email: string,
  username: string,
  avatarUrl: string
): Promise<User> {
  const githubIdString = githubId.toString();
  const user = await prisma.user.create({
    data: {
      id: githubIdString,
      email,
      emailVerified: true,
      profile: {
        create: {
          name: username,
          imageUrl: avatarUrl,
          email
        }
      },
      oauthAccount: {
        create: {
          providerId: 'github',
          providerUserId: githubIdString,
          userEmail: email,
          userName: username,
          userAvatarURL: avatarUrl
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

export async function getUserFromGitHubId(githubId: number): Promise<User | null> {
  const githubIdString = githubId.toString();
  const user = await prisma.user.findFirst({
    where: {
      oauthAccount: {
        providerId: 'github',
        providerUserId: githubIdString
      }
    },
    include: {
      profile: true,
      oauthAccount: true
    }
  });

  return user;
}