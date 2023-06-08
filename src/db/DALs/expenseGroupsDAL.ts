import dbConnect from "../dbConnect";
import ExpenseGroups from "../models/expenseGroups";

type ExpenseGroup = {
    admin: string,
    name: string,
    description: string,
    users: Array<string>
};

export const create = async (expenseGroup: ExpenseGroup) => {
    await dbConnect();
    return ExpenseGroups.create(expenseGroup);
};