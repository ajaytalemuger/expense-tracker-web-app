import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE_KEY } from "./utils/constants";
import { verifyToken } from "./utils/authToken";

export async function middleware(request: NextRequest) {
  let userToken = request.cookies.get(COOKIE_KEY)?.value;

  try {
    if (userToken) {
      const userData = await verifyToken(userToken);
      if (!userData) {
        throw new Error("user data not found in token");
      }
      request.headers.set("userData", userData.toString());
    } else {
      throw new Error("user token not found");
    }
  } catch (error) {
    console.log("Error while authenticating user", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
