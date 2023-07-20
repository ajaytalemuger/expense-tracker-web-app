import dbConnect from "../dbConnect";
import "../models/expenseGroups";
import Transactions from "../models/transactions";
import { Types } from "mongoose";

type Transaction = {
    expenseGroup: string,
    name: string,
    description: string,
    amount: number,
    type: string,
    currency: string,
    date: Date,
    category: Array<string>,
    paymentMode: string,
    createBy: string,
    updatedBy?: string,
};

export const create = async (transaction: Transaction) => {
    await dbConnect();
    return Transactions.create(transaction);
};

export const getByExpenseGroup = async (expenseGroupId: string) => {
    await dbConnect();
    return Transactions.find({ expenseGroup: new Types.ObjectId(expenseGroupId) });
};

export const getById = async (transactionId: string) => {
    await dbConnect();
    return Transactions.findOne({ _id: new Types.ObjectId(transactionId) })
        .populate("expenseGroup")
        .exec();
};

export const deleteById = async (transactionId: string) => {
    await dbConnect();
    return Transactions.findByIdAndDelete(transactionId);
};

export const updateById = async (transactionId: string, transaction: Transaction) => {
    await dbConnect();
    return Transactions.findOneAndUpdate({ _id: transactionId }, { ...transaction }, { returnDocument: "after" });
};

export const getByMultipleExpenseGroups = async (expenseGroupIds: Array<string>) => {
    await dbConnect();
    const expenseGroupMongoIds = expenseGroupIds.map((expenseGroupId) => new Types.ObjectId(expenseGroupId));
    return Transactions.find({ expenseGroup: { $in: expenseGroupMongoIds }});
};