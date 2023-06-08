import { NextResponse } from "next/server";
import { create, getByEmail } from "../../../db/DALs/usersDAL";
import { StatusCodes } from "http-status-codes";
import { COOKIE_KEY } from "@/utils/constants";
import { createToken } from "@/utils/authToken";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();

    // check if email already exists
    const user = await getByEmail(reqBody.email);

    if (user) {
      // if user exists return error status
      return NextResponse.json(
        {
          success: false,
          error: "User already exists",
        },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    } else {
      const createdUser = await create(reqBody);
      const token = await createToken(createdUser);

      return NextResponse.json(
        {
          success: true,
          createdUser: {
            name: createdUser.name,
            email: createdUser.email,
            token,
          },
        },
        {
          headers: {
            "Set-Cookie": `${COOKIE_KEY}=${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.log("Error while creating user", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
