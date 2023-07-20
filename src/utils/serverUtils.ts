import { NextRequest } from "next/server";

export const getResourceId = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const pathNameParts = pathName.split("/");
  return pathNameParts[pathNameParts.length - 1];
};

export const getUserData = (request: NextRequest) => {
  const userDataString = request.headers.get("userData");
  return userDataString ? JSON.parse(userDataString) : {};
};