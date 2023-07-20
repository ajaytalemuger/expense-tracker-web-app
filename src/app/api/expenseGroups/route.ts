import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { create, getByUserId } from "@/db/DALs/expenseGroupsDAL";
import {
  getByMultipleExpenseGroups,
} from "@/db/DALs/transactionsDAL";
import { Transaction } from "@/types";
import { TRANSACTION_TYPES } from "@/utils/constants";

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

      const expenseGroupDocs = await getByUserId(userData._id);

      let expenseGroups = expenseGroupDocs.map((expenseGroupDoc) => expenseGroupDoc.toObject());

      const expenseGroupIds = expenseGroups.map(
        (expenseGroup) => expenseGroup._id
      );

      // get transactions of all the fetched expense groups and calculate the total amount
      const allTransactions = await getByMultipleExpenseGroups(expenseGroupIds);

      const expenseGroupTotalAmtMap = getTotalTransactionAmount(allTransactions);

      expenseGroups.forEach((expenseGroup) => {
        if (expenseGroupTotalAmtMap.has(expenseGroup._id.toString())) {
          expenseGroup.totalTransactionAmount = expenseGroupTotalAmtMap.get(expenseGroup._id.toString());
        } else {
          expenseGroup.totalTransactionAmount = 0;
        }
      });

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

const getTotalTransactionAmount = (transactions: Array<Transaction>) => {
  let expenseGroupTotalAmtMap = new Map<string, number>();

  transactions.forEach((transaction) => {

    const expenseGroupId = transaction.expenseGroup.toString();

    if (!expenseGroupTotalAmtMap.has(expenseGroupId)) {
      expenseGroupTotalAmtMap.set(expenseGroupId, 0);
    }

    let totalAmount = expenseGroupTotalAmtMap.get(expenseGroupId);

    if (!totalAmount) {
      totalAmount = 0;
    }

    if (transaction.type === TRANSACTION_TYPES.CREDITED) {
      totalAmount += transaction.amount;
    } else {
      totalAmount -= transaction.amount;
    }

    expenseGroupTotalAmtMap.set(expenseGroupId, totalAmount);
  });

  return expenseGroupTotalAmtMap;
};
