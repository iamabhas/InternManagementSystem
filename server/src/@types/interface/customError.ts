export interface ICustomError extends Error {
  statusCode?: any;
  status?: string;
  path?: any;
  value?: any;
}
