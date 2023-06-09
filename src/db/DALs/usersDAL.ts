import { hashPassword } from "@/utils/authPwd";
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

export const getByEmail = async (email: string) => {
    await dbConnect();
    return Users.findOne({ email });
};

