export interface CustomError extends Error {
  statusCode?: any;
  status?: string;
  path?: any;
  value?: any;
}
