declare module "next" {
  interface NextApiRequest {
    file?: Express.Multer.File;
  }
}

declare module "next-connect" {
  import { NextApiRequest, NextApiResponse } from "next";

  type Middleware<TRequest, TResponse> = (
    req: TRequest,
    res: TResponse,
    next: (err?: unknown) => void,
  ) => void;

  interface Options<TRequest, TResponse> {
    onError?: (
      err: unknown,
      req: TRequest,
      res: TResponse,
      next: (err?: unknown) => void,
    ) => void;
    onNoMatch?: (req: TRequest, res: TResponse) => void;
  }

  interface NextConnect<TRequest, TResponse> {
    use(...handlers: Middleware<TRequest, TResponse>[]): this;
    get(...handlers: Middleware<TRequest, TResponse>[]): this;
    post(...handlers: Middleware<TRequest, TResponse>[]): this;
    put(...handlers: Middleware<TRequest, TResponse>[]): this;
    delete(...handlers: Middleware<TRequest, TResponse>[]): this;
    patch(...handlers: Middleware<TRequest, TResponse>[]): this;
    options(...handlers: Middleware<TRequest, TResponse>[]): this;
    head(...handlers: Middleware<TRequest, TResponse>[]): this;
  }

  export default function nextConnect<
    TRequest = NextApiRequest,
    TResponse = NextApiResponse,
  >(options?: Options<TRequest, TResponse>): NextConnect<TRequest, TResponse>;
}
