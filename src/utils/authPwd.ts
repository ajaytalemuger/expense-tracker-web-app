import bcrypt from "bcrypt";

export const hashPassword = async (pwd: any) => {
    if (process.env.SALT_ROUNDS) {
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
        return bcrypt.hash(pwd, salt);
    } else {
        throw new Error("salt rounds not provided");
    }
};

export const verifyPassword = (inputPwd: string | Buffer, hashPwd: string) => bcrypt.compare(inputPwd, hashPwd)

