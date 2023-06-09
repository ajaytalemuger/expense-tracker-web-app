import dbConnect from "../dbConnect";
import ExpenseGroups from "../models/expenseGroups";
import { Types } from "mongoose";


type ExpenseGroup = {
    admin: string,
    name: string,
    description: string,
    otherUsers: Array<string>
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