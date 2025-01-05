"use server";
import { createWebAuthnChallenge } from "@/lib/server/webauthn";
import { encodeBase64 } from "@oslojs/encoding";
// import { headers } from "next/headers";

export async function createWebAuthnChallengeAction(): Promise<string> {
  // todo: add user rate-limit here
  // const clientIP = (await headers()).get("X-Forwarded-For");
  // if (clientIP !== null && !webauthnChallengeRateLimitBucket.consume(clientIP, 1)) {
  // 	throw new Error("Too many requests");
  // }
  const challenge = createWebAuthnChallenge();
  return encodeBase64(challenge);
}
