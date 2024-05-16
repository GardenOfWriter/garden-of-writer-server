import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function Login(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '로그인',
    }),
    ApiResponse({
      schema: {
        properties: {
          accessToken: {
            description: '로그인 토큰',
          },

          hasRoom: {
            description:
              '소셜 공방 참여 이력 값, 참여 이력이 있음 treu,참여 이력이 없음 : false',
          },
        },
      },
    }),
  );
}

export function Logout(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: '로그아웃',
    }),
  );
}
