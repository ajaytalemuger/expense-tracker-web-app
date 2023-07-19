import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { create } from "@/db/DALs/transactionsDAL";

export async function POST(request: Request) {
  try {
    let transaction = await request.json();

    const userDataString = request.headers.get("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      transaction = {
        ...transaction,
        createdBy: userData._id,
      };
    }

    const createdTransaction = await create(transaction);

    return NextResponse.json({ success: true, createdTransaction });

  } catch (error) {
    console.log("error while creating transaction", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}