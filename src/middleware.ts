import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COOKIE_KEY } from "./utils/constants";
import { verifyToken } from "./utils/authToken";
import { StatusCodes } from "http-status-codes";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return await validateUserTokenInCookies(request);
  }

  if (request.nextUrl.pathname.startsWith("/api/expenseGroups")) {
    return await validateBearerToken(request);
  }
}

const validateUserTokenInCookies = async (request: NextRequest) => {
  let userToken = request.cookies.get(COOKIE_KEY)?.value;

  try {
    if (userToken) {
      
      const userData = await verifyToken(userToken);

      if (!userData) {
        throw new Error("user data not found in token");
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("userData", JSON.stringify(userData));

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });

    } else {
      throw new Error("user token not found");
    }
  } catch (error) {
    console.log("Error while authenticating user", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

};

const validateBearerToken = async (request: NextRequest) => {

  const authorizationHeaderParts = request.headers
    .get("Authorization")
    ?.split(" ");

  try {

    // check if bearer token exists in request header and validate it
    if (
      authorizationHeaderParts &&
      authorizationHeaderParts.length === 2 &&
      authorizationHeaderParts[0] === "Bearer" &&
      authorizationHeaderParts[1]
    ) {
      const userData = await verifyToken(authorizationHeaderParts[1]);

      if (!userData) {
        throw new Error("user data not found in token");
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("userData", JSON.stringify(userData));

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });

    } else {
      throw new Error("invalid bearer token");
    }
  } catch (error) {
    console.log("Error while authenticating bearer token", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.FORBIDDEN }
    );
  }

};

export const config = {
  matcher: ["/dashboard", "/api/expenseGroups"],
};
