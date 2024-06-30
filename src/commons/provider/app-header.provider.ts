import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppHeaderProvider implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessCrendentials = 'Access-Control-Allow-Credentials';
    const accessOrigin = 'Access-Control-Allow-Origin';
    const accessMethods = 'Access-Control-Allow-Methods';
    const accessHeaders = 'Access-Control-Allow-Headers';
    res.setHeader(accessCrendentials, 'true');

    res.setHeader(accessOrigin, req.headers.origin || '*');
    res.setHeader(accessMethods, 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  }
}
