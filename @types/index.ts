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
