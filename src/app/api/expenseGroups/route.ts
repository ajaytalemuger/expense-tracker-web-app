import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { create, getByUserId } from "@/db/DALs/expenseGroupsDAL";

export async function POST(request: Request) {
  try {
    let expenseGroup = await request.json();

    const userDataString = request.headers.get("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      expenseGroup = {
        ...expenseGroup,
        createdBy: userData._id,
      };
    }

    const createdExpenseGroup = await create(expenseGroup);

    return NextResponse.json({ success: true, createdExpenseGroup });
    
  } catch (error) {
    console.log("error while creating expense group", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET(request: Request) {
  try {
    const userDataString = request.headers.get("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      const expenseGroups = await getByUserId(userData._id);

      return NextResponse.json({
        success: true,
        expenseGroups,
      });

    } else {
      throw new Error("user data not found in request");
    }
  } catch (error) {
    console.log("error while fetching expense groups", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
