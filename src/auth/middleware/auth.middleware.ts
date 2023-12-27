// import { userEntity } from '@app/user/entities/user.entity';
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request } from 'express';

// // interface UserRequest extends Request {
// //   user: userEntity;
// // }

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private currentUserProvider: CurrentUserProvider) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     // 요청에서 사용자 정보를 추출하는 로직을 작성합니다.
//     // 이 예제에서는 간단하게 req.user를 사용합니다.
//     const user = req.user;
//     console.log('user', user);
//     this.currentUserProvider.setUser(user);
//     console.log('middileware::', this.currentUserProvider.user);
//     next();
//   }
// }
