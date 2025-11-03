import { ApiOkResponse } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import _ from 'lodash';

interface ApiMetaProperty {
  statusCode: number;
  message: string;
  timestamp: Date;
}

export const ApiCommonResponse = (obj: SchemaObject & Partial<ReferenceObject>, options: { isArray?: boolean } = {}) => {
  const { isArray = false } = options; // isArray 기본값을 false로 설정

  return ApiOkResponse({
    schema: {
      properties: {
        data: isArray
          ? {
              type: 'array',
              items: obj, // 배열일 경우 아이템의 타입을 설정
            }
          : obj, // 객체일 경우 그대로 사용
      },
    },
  });
};
