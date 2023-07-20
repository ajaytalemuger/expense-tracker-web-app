import dbConnect from "../dbConnect";
import ExpenseGroups from "../models/expenseGroups";
import { Types } from "mongoose";


type ExpenseGroup = {
    admin: string,
    name: string,
    description: string,
    otherUsers: Array<string>,
    createdBy?: string,
    updatedBy?: string,
};

export const create = async (expenseGroup: ExpenseGroup) => {
    await dbConnect();
    return ExpenseGroups.create(expenseGroup);
};

/**
 * Get all the expenseGroups which has the given userId as either the admin or one of the 'otherUsers'
 * @param userId string
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

export const getById = async (expenseGroupId: string) => {
    await dbConnect();
    return ExpenseGroups.findOne({ _id: expenseGroupId });
};

export const updateById = async (expenseGroupId: string, expenseGroup: ExpenseGroup) => {
    await dbConnect();
    return ExpenseGroups.findOneAndUpdate({ _id: expenseGroupId }, { ...expenseGroup }, { returnDocument: "after" });
};

export const deleteById = async (expenseGroupId: string) => {
    await dbConnect();
    return ExpenseGroups.deleteOne({ _id: expenseGroupId });
};