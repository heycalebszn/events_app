import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { globalGETRateLimit } from "@/lib/server/request";
import { Profile, OauthAccount } from "@prisma/client";
import { ProfileContent } from "@/components/profile";

type UserWithRelations = {
  id: string;
  email: string | null;
  password: string | null;
  emailVerified: boolean;
  verificationCode: string | null;
  createdAt: Date;
  updatedAt: Date;
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

  const profilePicture = session.user.profile?.imageUrl || session.user.oauthAccount?.userAvatarURL || null;

  // Extract first name from email
  const firstName = session.user.email
    ? session.user.email.split('@')[0].charAt(0).toUpperCase() +
    session.user.email.split('@')[0].slice(1)
    : "John";

  const lastName = "Doe";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-lg">
        <ProfileContent
          profilePicture={profilePicture}
          firstName={firstName}
          lastName={lastName}
          email={session.user.email}
        />
      </div>
    </div>
  );
}

