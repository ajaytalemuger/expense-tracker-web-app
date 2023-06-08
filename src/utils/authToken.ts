import * as jose from "jose";

export const createToken = async (user: any): Promise<string> => {
  const userTokenDetails = { name: user.name, email: user.email };

  if (!process.env.TOKEN_PRIVATE_KEY) {
    throw new Error("token private key not provided");
  }

  return new jose.SignJWT(userTokenDetails)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(new TextEncoder().encode(process.env.TOKEN_PRIVATE_KEY));
};

export const verifyToken = async (token: string): Promise<Object> => {
  if (!process.env.TOKEN_PRIVATE_KEY) {
    throw new Error("token private key not provided");
  }
  
  const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_PRIVATE_KEY));

  return payload;
};
