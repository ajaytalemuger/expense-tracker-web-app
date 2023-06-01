import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export const hashPassword = async (pwd: any) => {
    if (process.env.SALT_ROUNDS) {
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
        return bcrypt.hash(pwd, salt);
    } else {
        throw new Error("salt rounds not provided");
    }
};

export const verifyPassword = (inputPwd: string | Buffer, hashPwd: string) => bcrypt.compare(inputPwd, hashPwd)

export const createToken = (user: any) => {
    const userTokenDetails = { name: user.name, email: user.email };

    if (!process.env.TOKEN_PRIVATE_KEY)
    {
        throw new Error("token private key not provided");
    }

    return sign(userTokenDetails, process.env.TOKEN_PRIVATE_KEY);
};