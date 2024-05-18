import { ApiOkResponse } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface ApiMetaProperty {
  statusCode: number;
  message: string;
  timestamp: Date;
}

export const ApiCommonResponse = (obj: SchemaObject & Partial<ReferenceObject>) => {
  return ApiOkResponse({
    schema: {
      properties: {
        data: {
          ...obj,
        },
      },
    },
  });
};
