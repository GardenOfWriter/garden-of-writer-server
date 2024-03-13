// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
// } from '@nestjs/common';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();
//     response.json();
// c
