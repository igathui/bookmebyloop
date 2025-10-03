import { createHash } from "crypto";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(
  password: string,
  hashedPassword: string,
): boolean {
  const hash = hashPassword(password);
  return hash === hashedPassword;
}
