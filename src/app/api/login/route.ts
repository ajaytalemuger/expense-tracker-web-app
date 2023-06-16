import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getByEmail } from "@/db/DALs/usersDAL";
import { verifyPassword } from "@/utils/authPwd";
import { COOKIE_KEY } from "@/utils/constants";
import { createToken } from "@/utils/authToken";

export async function POST(request: Request) {
  try {
    const loginCred = await request.json();

    const user = await getByEmail(loginCred.email);

    if (!(user && user.pwd && await verifyPassword(loginCred.pwd, user.pwd))) {
      return NextResponse.json(
        { success: false },
        { status: StatusCodes.UNAUTHORIZED }
      );
    } else {
      const token = await createToken(user);
      return NextResponse.json(
        {
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
          },
        },
        {
          headers: {
            "Set-Cookie": `${COOKIE_KEY}=${token}; Path=/`,
          },
        }
      );
    }
  } catch (error) {
    console.log("error while logging user", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
