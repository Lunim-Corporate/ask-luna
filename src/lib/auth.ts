import { createHash, timingSafeEqual } from "crypto";

export const DASHBOARD_EMAIL = "hello@lunim.io";
export const DASHBOARD_PASSWORD_HASH =
  "c97a497c6f44e9b915fd50b7217a407b9552f4514e5ccd97f9876409d6aca402";
export const DASHBOARD_COOKIE = "lunaDashboardAuth";
export const DASHBOARD_COOKIE_VALUE = "authenticated";

const PASSWORD_BUFFER = Buffer.from(DASHBOARD_PASSWORD_HASH, "hex");

export function verifyDashboardPassword(password: string): boolean {
  const hashedInput = createHash("sha256").update(password).digest();
  return (
    hashedInput.length === PASSWORD_BUFFER.length &&
    timingSafeEqual(hashedInput, PASSWORD_BUFFER)
  );
}
