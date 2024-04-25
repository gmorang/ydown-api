import * as express from "express";
import { onRequest as firebaseOnRequest, HttpsOptions, Request } from "firebase-functions/v2/https";

export const defaultConfig: HttpsOptions = {
  cors: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequest = (handler: (request: Request, response: express.Response<any>) => void | Promise<void>) => {
  return firebaseOnRequest(defaultConfig, handler);
};
