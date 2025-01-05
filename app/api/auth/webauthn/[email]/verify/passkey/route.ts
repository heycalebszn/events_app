import { decodeBase64 } from "@oslojs/encoding";
import { NextResponse } from "next/server";
import {
  ClientDataType,
  coseAlgorithmES256,
  coseAlgorithmRS256,
  createAssertionSignatureMessage,
  parseAuthenticatorData,
  parseClientDataJSON,
  type AuthenticatorData,
  type ClientData,
} from "@oslojs/webauthn";
import {
  getUserPasskeyCredential,
  verifyWebAuthnChallenge,
} from "@/lib/server/webauthn";
import { verifyEmailInput } from "@/lib/email";
import {
  decodePKIXECDSASignature,
  decodeSEC1PublicKey,
  p256,
  verifyECDSASignature,
} from "@oslojs/crypto/ecdsa";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  decodePKCS1RSAPublicKey,
  sha256ObjectIdentifier,
  verifyRSASSAPKCS1v15Signature,
} from "@oslojs/crypto/rsa";

type Params = Promise<{ email: string }>;

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const body: {
      credential_id: string;
      signature: string;
      authenticator_data: string;
      client_data_json: string;
    } = await req.json();

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

    if (
      !body.credential_id ||
      !body.signature ||
      !body.authenticator_data ||
      !body.client_data_json
    ) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid or missing fields!",
      });
    }

    const authenticatorDataBytes = decodeBase64(body.authenticator_data);
    const clientDataJSON = decodeBase64(body.client_data_json);
    const credentialId = decodeBase64(body.credential_id);
    const signatureBytes = decodeBase64(body.signature);

    let authenticatorData: AuthenticatorData;

    try {
      authenticatorData = parseAuthenticatorData(authenticatorDataBytes);
    } catch {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid data, failed to parse authenticator data!",
      });
    }

    if (
      !authenticatorData.verifyRelyingPartyIdHash(
        process.env.NEXT_PUBLIC_WEBAUTHN_HOST as string
      )
    ) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Failed to verify relying party!",
      });
    }
    if (!authenticatorData.userPresent) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid passkeys data!",
      });
    }

    let clientData: ClientData;
    try {
      clientData = parseClientDataJSON(clientDataJSON);
    } catch {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid passkeys client data json!",
      });
    }
    if (clientData.type !== ClientDataType.Get) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid passkeys client data type!",
      });
    }

    if (!verifyWebAuthnChallenge(clientData.challenge)) {
      return new NextResponse(null, {
        status: 400,
        statusText:
          "WebAuthn challenge verification failed. Please ensure the challenge data is valid and try again.",
      });
    }

    if (
      clientData.origin !== (process.env.NEXT_PUBLIC_WEBAUTHN_ORIGIN as string)
    ) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid passkeys client origin!",
      });
    }
    if (clientData.crossOrigin !== null && clientData.crossOrigin) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid passkeys client cross-origin data!",
      });
    }

    const credential = await getUserPasskeyCredential(email, credentialId);
    if (credential === null) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Passkeys credentials not found!",
      });
    }

    let validSignature: boolean;
    if (credential.algorithmId === coseAlgorithmES256) {
      const ecdsaSignature = decodePKIXECDSASignature(signatureBytes);
      const ecdsaPublicKey = decodeSEC1PublicKey(p256, credential.publicKey);
      const hash = sha256(
        createAssertionSignatureMessage(authenticatorDataBytes, clientDataJSON)
      );
      validSignature = verifyECDSASignature(
        ecdsaPublicKey,
        hash,
        ecdsaSignature
      );
    } else if (credential.algorithmId === coseAlgorithmRS256) {
      const rsaPublicKey = decodePKCS1RSAPublicKey(credential.publicKey);
      const hash = sha256(
        createAssertionSignatureMessage(authenticatorDataBytes, clientDataJSON)
      );
      validSignature = verifyRSASSAPKCS1v15Signature(
        rsaPublicKey,
        sha256ObjectIdentifier,
        hash,
        signatureBytes
      );
    } else {
      return new NextResponse(null, {
        status: 400,
        statusText: "Internal error!",
      });
    }

    if (!validSignature) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Invalid data!",
      });
    }

    return NextResponse.json({
      message: "Successfully logged in with passkeys!",
    });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(null, {
        status: 500,
        statusText: `[WEBAUTHN_VERIFY_PASSKEYS]: ${error.message}`,
      });
    }
    return new NextResponse(null, {
      status: 500,
      statusText: `[WEBAUTHN_VERIFY_PASSKEYS]: error verifying passkeys!`,
    });
  }
}
