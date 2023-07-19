import { NextRequest } from "next/server";

export const getResourceId = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const pathNameParts = pathName.split("/");
  return pathNameParts[pathNameParts.length - 1];
};
