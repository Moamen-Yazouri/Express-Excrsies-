export type StringObj = Record<string, unknown>;

export enum MODULES {
    AUTH = "auth",
    USER = "user",
}

export type MyModules = `${MODULES}`;

export enum HttpStatus {
  
  OK = 200,
  Created = 201,
  NoContent = 204,

  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}


export interface IJwtPayload {
  sub: string,
  name: string,
  email: string,
}

declare module 'express-session' {
  interface SessionData {
    userId: string,
  }
}
interface IEnvs {
    PORT: number;
    JWT_SECRET: string,
    SESSION_SECRET: string,
    NODE_ENV: "production" | "development",
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnvs {}
  }
}