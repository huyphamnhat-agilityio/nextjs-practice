/* eslint-disable  @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function getJwtExpiration(token: string): Date | null {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    if (!decoded.exp) return null;

    return new Date(decoded.exp * 1000);
  } catch (e) {
    console.error("Invalid JWT:", e);
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  const expDate = getJwtExpiration(token);
  if (!expDate) return true;
  return expDate.getTime() < Date.now();
}
