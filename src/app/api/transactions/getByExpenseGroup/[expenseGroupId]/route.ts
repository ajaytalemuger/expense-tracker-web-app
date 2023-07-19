import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getResourceId } from "@/utils/serverUtils";
import { getById } from "@/db/DALs/expenseGroupsDAL";
import { getByExpenseGroup } from "@/db/DALs/transactionsDAL";

export async function GET(request: NextRequest) {
  try {

    // check for expense group id in request
    const expenseGroupId = getResourceId(request);
    if (!expenseGroupId) {
      return NextResponse.json(
        { success: false, errorMsg: "expense group id not provided" },
        { status: StatusCodes.BAD_REQUEST }
      ); 
    }

    // check if expense group exists
    const prevExpenseGroup = await getById(expenseGroupId);
    if (!prevExpenseGroup) {
      return NextResponse.json(
        { success: false, errorMsg: "expense group not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // TODO: Check if expenseGroupId is a valid mongo id string

    const transactions = await getByExpenseGroup(expenseGroupId);

    return NextResponse.json({ success: true, transactions });

  } catch (error) {
    console.log("error while fetching transactions by expense group id ", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
