import { statusConstants } from "../../constants/statusConstants";
const { FAIL, ERROR, SUCCESS } = statusConstants;

class AppError extends Error {
  statusCode: any;
  status: string;
  constructor(message: any, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
