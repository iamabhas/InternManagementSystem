import {commonRequest} from "./ApiCall";
import {BACKEND_URL} from "./helper.js";

export const loginFunction = async (data) => {
    return await commonRequest("POST", `${BACKEND_URL}/api/login`, data);
};

export const registerIntern = async (data) => {
    return await commonRequest("POST", `${BACKEND_URL}/api/batch/intern`, data);
};
