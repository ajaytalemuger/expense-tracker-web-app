import { Transaction } from "@/types";
import dbConnect from "../dbConnect";
import "../models/expenseGroups";
import Transactions from "../models/transactions";
import { Types } from "mongoose";

/**
 * Creates a new transaction
 * @param transaction 
 * @returns newly created transaction doc
 */
export const create = async (transaction: Transaction) => {
    await dbConnect();
    return Transactions.create(transaction);
};

/**
 * Get all the transactions that is part of the given expense group id
 * @param expenseGroupId 
 * @returns array of transaction docs
 */
export const getByExpenseGroup = async (expenseGroupId: string) => {
    await dbConnect();
    return Transactions.find({ expenseGroup: new Types.ObjectId(expenseGroupId) });
};

/**
 * Get the transaction matching the given transaction id
 * @param transactionId 
 * @returns transaction doc
 */
export const getById = async (transactionId: string) => {
    await dbConnect();
    return Transactions.findOne({ _id: new Types.ObjectId(transactionId) })
        .populate("expenseGroup")
        .exec();
};

/**
 * Delete a transaction using the given transaction id
 * @param transactionId 
 * @returns delete response doc
 */
export const deleteById = async (transactionId: string) => {
    await dbConnect();
    return Transactions.findByIdAndDelete(transactionId);
};

/**
 * Updates a transaction matching the given transaction id with the given update fields
 * @param transactionId 
 * @param transaction 
 * @returns updated transaction doc
 */
export const updateById = async (transactionId: string, transaction: Transaction) => {
    await dbConnect();
    return Transactions.findOneAndUpdate({ _id: transactionId }, { ...transaction }, { returnDocument: "after" });
};

/**
 * Get all the transactions part of any of the expense groups in the given array of expense group ids
 * @param expenseGroupIds 
 * @returns array of transaction docs
 */
export const getByMultipleExpenseGroups = async (expenseGroupIds: Array<string>) => {
    await dbConnect();
    const expenseGroupMongoIds = expenseGroupIds.map((expenseGroupId) => new Types.ObjectId(expenseGroupId));
    return Transactions.find({ expenseGroup: { $in: expenseGroupMongoIds }});
};

/**
 * Delete multiple transactions belonging to the given expense group id
 * @param expenseGroupId 
 * @returns delete response doc
 */
export const deleteByExpenseGroupId = async (expenseGroupId: string) => {
    await dbConnect();
    return Transactions.deleteMany({ expenseGroup: new Types.ObjectId(expenseGroupId) });
};