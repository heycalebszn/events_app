import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout";
import { globalGETRateLimit } from "@/lib/server/request";
import Image from "next/image";
import { Profile, OauthAccount, Role } from "@prisma/client";

type UserWithRelations = {
  id: string;
  email: string | null;
  password: string | null;
  emailVerified: boolean;
  verificationCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  profile: Profile | null;
  oauthAccount: OauthAccount | null;
}

type SessionResult = {
  user: UserWithRelations | null;
}

export default async function Page() {
  if (!globalGETRateLimit()) {
    return "Too many requests";
  }
  
  const session = await getCurrentSession() as SessionResult;
  if (!session.user) {
    return redirect("/");
  }

  const profilePicture = session.user.profile?.imageUrl || session.user.oauthAccount?.userAvatarURL || "";
  
  // Extract first name from email
  const firstName = session.user.email
    ? session.user.email.split('@')[0].charAt(0).toUpperCase() + 
      session.user.email.split('@')[0].slice(1)
    : "Guest";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          {profilePicture && (
            <Image 
              src={profilePicture} 
              height={50} 
              width={50} 
              alt="profile"
              className="rounded-full" 
            />
          )}
          <h1 className="text-2xl font-bold">Hi, {firstName}</h1>
          <p className="text-gray-600">Email: {session.user.email}</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}