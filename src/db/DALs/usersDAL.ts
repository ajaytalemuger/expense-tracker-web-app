import { hashPassword } from "@/utils/authPwd";
import dbConnect from "../dbConnect";
import Users from "../models/users";
import { User } from "@/types";

/**
 * Creates a new user
 * @param user 
 * @returns newly created user doc
 */
export const create = async (user: User) => {
    await dbConnect();
    const hashedPwd = await hashPassword(user.pwd);
    user.pwd = hashedPwd;
    const createdUser = await Users.create(user);
    return createdUser;
};

/**
 * Get the user matching the given email id
 * @param email 
 * @returns user doc
 */
export const getByEmail = async (email: string) => {
    await dbConnect();
    return Users.findOne({ email });
};

