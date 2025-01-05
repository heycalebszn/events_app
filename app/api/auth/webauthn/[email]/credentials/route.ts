import { verifyEmailInput } from "@/lib/email";
import { getUserPasskeyCredentials } from "@/lib/server/webauthn";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const { email } = await params;

    if (!email) {
      return new NextResponse(null, {
        status: 400,
        statusText: "email is required!",
      });
    }

    if (!verifyEmailInput(email)) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid email!",
      });
    }

    const credentials = await getUserPasskeyCredentials(email);

    return NextResponse.json({
      credentials,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(null, {
        status: 500,
        statusText: `[WEBAUTHN_CREDENTIALS]: ${error.message}`,
      });
    }
    return new NextResponse(null, {
      status: 500,
      statusText: `[WEBAUTHN_CREDENTIALS]: error creating credentials!`,
    });
  }
}
