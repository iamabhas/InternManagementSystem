import { commonRequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const loginFunction = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/login/`, data);
};
