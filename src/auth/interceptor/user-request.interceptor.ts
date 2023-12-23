// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class UserRequestInterceptor implements NestInterceptor {
//   constructor(private currentUserProvider: CurrentUserProvider) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     this.currentUserProvider.setUser(request.user);
//     return next.handle();
//   }
// }
