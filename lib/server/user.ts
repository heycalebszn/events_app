import { prisma } from "./db";
import type { User } from "@prisma/client";

export async function createUser(
  googleId: string, 
  email: string, 
  name: string, 
  picture: string
): Promise<User> {
  const user = await prisma.user.create({
    data: {
      id: googleId, // Using googleId as the primary id
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

