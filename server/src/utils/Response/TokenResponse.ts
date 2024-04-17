import { Response } from "express";

export const sendTokenResponse = (
  res: Response,
  statusCode: number,
  response: boolean,
  message: string,
  accesstoken: string,
  username: string,
  role: string,
  id: string
) => {
  return res.json({
    statusCode: statusCode,
    resposne: response,
    access_token: accesstoken,
    user_Name: username,
    user_role: role,
    user_id: id,
  });
};
