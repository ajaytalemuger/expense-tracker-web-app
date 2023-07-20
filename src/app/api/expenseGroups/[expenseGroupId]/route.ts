import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { deleteById, getById, updateById } from "@/db/DALs/expenseGroupsDAL";
import { getResourceId, getUserData } from "@/utils/serverUtils";
import { deleteByExpenseGroupId } from "@/db/DALs/transactionsDAL";

export async function PUT(request: NextRequest) {
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

    let expenseGroup = await request.json();

    // TODO: verify expense group object from request body

    const userDataString = request.headers.get("userData");

    if (userDataString) {
      const userData = JSON.parse(userDataString);

      const userId = userData._id;

      if (prevExpenseGroup.admin?.toString() !== userId) {
        return NextResponse.json(
          { success: false, errorMsg: "user not authorized to update expense group" },
          { status: StatusCodes.FORBIDDEN }
        );
      }

      expenseGroup = {
        ...expenseGroup,
        updatedBy: userId,
      };
    }

    const updatedExpenseGroup = await updateById(expenseGroupId, expenseGroup);

    return NextResponse.json({ success: true, updatedExpenseGroup });

  } catch (error) {
    console.log("error while updating expense group ", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(request: NextRequest) {
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
    const expenseGroup = await getById(expenseGroupId);
    if (!expenseGroup) {
      return NextResponse.json(
        { success: false, errorMsg: "expense group not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const userData = getUserData(request);

    // check if user is admin of expense group before deleting
    if (!(userData && userData._id ===  expenseGroup.admin.toString())) {
      return NextResponse.json(
        { success: false, errorMsg: "user is not authorized to delete expense group" },
        { status: StatusCodes.FORBIDDEN }
      ); 
    }

    await deleteById(expenseGroupId);
    await deleteByExpenseGroupId(expenseGroupId);

    return NextResponse.json(
      { success: true }
    );

  } catch(error) {
    console.log("Error while deleting expense group ", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}