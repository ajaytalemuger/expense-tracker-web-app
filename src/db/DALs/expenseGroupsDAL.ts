import { ExpenseGroup } from "@/types";
import dbConnect from "../dbConnect";
import ExpenseGroups from "../models/expenseGroups";
import { Types } from "mongoose";

/**
 * Creates a new expense group
 * @param expenseGroup 
 * @returns newly created expense group doc
 */
export const create = async (expenseGroup: ExpenseGroup) => {
    await dbConnect();
    return ExpenseGroups.create(expenseGroup);
};

/**
 * Get all the expenseGroups which has the given userId as either the admin or one of the 'otherUsers'
 * @param userId string
 * @returns array of expense group docs
 */
export const getByUserId = async (userId: string) => {
    await dbConnect();
    return ExpenseGroups.find({
        $or: [
            {
                admin: new Types.ObjectId(userId)
            },
            {
                otherUsers: new Types.ObjectId(userId)
            }
        ]
    });
};

/**
 * Get one expense group matching the given expense group id
 * @param expenseGroupId 
 * @returns expense group doc
 */
export const getById = async (expenseGroupId: string) => {
    await dbConnect();
    return ExpenseGroups.findOne({ _id: expenseGroupId });
};

/**
 * Updates one expense group matching the given id with the given update fields
 * @param expenseGroupId 
 * @param expenseGroup 
 * @returns updated expense group doc
 */
export const updateById = async (expenseGroupId: string, expenseGroup: ExpenseGroup) => {
    await dbConnect();
    return ExpenseGroups.findOneAndUpdate({ _id: expenseGroupId }, { ...expenseGroup }, { returnDocument: "after" });
};

/**
 * Deletes one expense group matching the given expense group id
 * @param expenseGroupId 
 * @returns delete response doc
 */
export const deleteById = async (expenseGroupId: string) => {
    await dbConnect();
    return ExpenseGroups.deleteOne({ _id: expenseGroupId });
};