import { NextResponse, NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getResourceId, getUserData } from "@/utils/serverUtils";
import { deleteById, getById, updateById } from "@/db/DALs/transactionsDAL";

const EDITABLE_TRANSACTION_FIELD = [
  "name",
  "description",
  "amount",
  "type",
  "currency",
  "date",
  "categories",
  "paymentMode"
];

export async function DELETE(request: NextRequest) {
  try {

    const transactionId = getResourceId(request);

    const transaction = await getById(transactionId);

    if (!transaction) {
        return NextResponse.json(
            { 
                success: false,
                errorMessage: "Transaction not found"
            },
            { status: StatusCodes.NOT_FOUND }
        )
    }

    const userHasAccess = await validateUserIdWithTransaction(request, transaction);

    if (!userHasAccess) {
        return NextResponse.json(
            { 
                success: false,
                errorMessage: "Either user id is not valid or User is not authorized to delete this transaction"
            },
            { status: StatusCodes.FORBIDDEN }
        )
    } else {
        await deleteById(transactionId);

        return NextResponse.json({ success: true });
    }
    
  } catch (error) {
    console.log("Error while deleting transaction ", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {

    const transactionId = getResourceId(request);

    const prevTransaction = await getById(transactionId);

    let transaction = await request.json();

    if (!prevTransaction) {
        return NextResponse.json(
            { 
                success: false,
                errorMessage: "Transaction not found"
            },
            { status: StatusCodes.NOT_FOUND }
        )
    }

    const userHasAccess = await validateUserIdWithTransaction(request, prevTransaction);

    if (!userHasAccess) {
      return NextResponse.json(
          { 
              success: false,
              errorMessage: "Either user id is not valid or User is not authorized to update this transaction"
          },
          { status: StatusCodes.FORBIDDEN }
      )
    } else {

      let transactionEditDoc: any = {};

      EDITABLE_TRANSACTION_FIELD.forEach((field) => {
        transactionEditDoc[field] = transaction[field];
      });

      const userData = getUserData(request);

      if (userData) {
        transactionEditDoc.updatedBy = userData._id;
      }

      const updatedTransaction = await updateById(transactionId, transactionEditDoc);

      return NextResponse.json({ success: true, updatedTransaction });
  }

  } catch(error) {
    console.log("Error while updating transaction ", error);
    return NextResponse.json(
      { success: false },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

const validateUserIdWithTransaction = async (request: NextRequest, transaction: any) => {

  let userHasAccess = false;

  const userDataString = request.headers.get("userData");

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const userId = userData._id;

    // check if user id matches with transaction creator or expense groups admin
    let userIdsToCheck = [
      transaction.createdBy.toString(),
      transaction.expenseGroup.admin.toString(),
    ];

    userHasAccess = userIdsToCheck.includes(userId);
  }

  return userHasAccess;
};
