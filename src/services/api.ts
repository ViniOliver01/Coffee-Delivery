import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../context/AuthContext";

interface AxiosErrorResponse {
  message?: string;
}

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["coffee.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      // console.log(error);

      if (error.response?.status == 400) {
        return error.response;
      }

      if (error.response?.status == 401) {
        if (error.response?.data?.message === "Invalid token!") {
          console.log("=== Refreshing ===");
          cookies = parseCookies(ctx);
          const { "coffee.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("/refresh-token", {
                refresh_token: refreshToken,
              })
              .then((response) => {
                const { token, refresh_token } = response.data;

                setCookie(ctx, "coffee.token", token, {
                  maxAge: 60 * 60 * 24 * 30, //30 days
                  path: "/",
                });

                setCookie(ctx, "coffee.refreshToken", refresh_token, {
                  maxAge: 60 * 60 * 24 * 30, //30 days
                  path: "/",
                });

                failedRequestsQueue.forEach((request) => request.onSuccess(token));
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err));
                failedRequestsQueue = [];

                if (typeof window !== "undefined") {
                  signOut();
                } else {
                  console.error("Auth Error");
                  return;
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (typeof window !== "undefined") {
            signOut();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
