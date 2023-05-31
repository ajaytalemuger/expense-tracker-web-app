import { hashPassword } from "@/utils/auth";
import dbConnect from "../dbConnect";
import Users from "../models/users";

type User = {
    name: String,
    email: String,
    pwd: String,
}

export const create = async (user: User) => {
    await dbConnect();
    const hashedPwd = await hashPassword(user.pwd);
    user.pwd = hashedPwd;
    const createdUser = await Users.create(user);
    return createdUser;
};

