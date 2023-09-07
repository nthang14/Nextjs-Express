export const ORDER_ASCEND = "ascend";
export const ORDER_DESCEND = "descend";
export const PATH_API: string =
  process.env.REACT_APP_API_BASE_URL || "http://4.216.225.85:3001";
export const PATH_API_TEST: string = "http://localhost:8000/api/v1";
export const URL_AUTH = "/auth";
export const METHOD = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
};
export const RPC_URL: string =
  process.env.RPC_URL || "http://4.216.225.190:8545";
