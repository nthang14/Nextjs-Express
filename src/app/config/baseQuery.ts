// import { logout } from "~/app/slices/authSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { notification } from "antd";
import { Mutex } from "async-mutex";
import axios from "axios";
import {
  readAccessToken,
  readAddressWallet,
  readMnemonic,
  readNonce,
} from "~/utils/storage";
import { ErrorProps } from "~/types/globalTypes";
import { METHOD } from "~/utils/constants";
import { PATH_API } from "~/utils/constants";
// create a new mutex
const mutex = new Mutex();

const instance = axios.create({
  baseURL: PATH_API,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config: any) => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const getAuthorization = async (address: string) => {
//   const nonce = await getNonce(address);
//   const signature = await getSignatureWithNone(nonce);

//   return `${nonce}:${signature}`;
// };

// const getNonce = async (address: string) => {
//   const result = await instance.get(`auth/current-nonce?address=${address}`);

//   return result.data.data;
// };

const callApi = async (args: any) => {
  // const isAuth = args.url.includes("/auth");
  // let header: any = {};
  // if (!isAuth) {
  //   const auth = await getAuthorization(readAddressWallet());
  //   header["authorization"] = auth;
  // }

  const method = args.method.toLowerCase();
  switch (method) {
    case METHOD.post:
      return await instance.post(`${PATH_API}${args.url}`, args.body);
    case METHOD.put:
      return await instance.put(`${PATH_API}${args.url}`, args.body);
    case METHOD.delete:
      return await instance.delete(`${PATH_API}${args.url}`);
    default:
      return await instance.get(`${PATH_API}${args.url}`, {
        params: args.params,
      });
  }
};

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api) => {
  await mutex.waitForUnlock();
  const response = {
    data: [],
  };
  let result: any = await callApi(args);
  response.data = result.data;
  const error = result.data.error;

  if (error && error.code) {
    switch (error.code) {
      case 400:
        notification.error({
          message: "Bad request",
        });
        break;
      case 401:
        // api.dispatch(logout());
        notification.error({
          message: error.message,
        });
        break;
      case 403:
        notification.error({
          message: error.message,
        });
        // api.dispatch(logout());
        break;
      case 422:
        const getError = Object.values(
          (result.error?.data as ErrorProps)?.errors
        )[0];
        notification.error({
          message: getError[0],
        });
        break;
      case 500:
        notification.error({
          message: "Error",
        });
        break;
      case 501:
      case 502:
      case 503:
        notification.error({
          message: "Internal Server Error",
        });
        break;
    }
  }
  return response;
};

export default baseQuery;
