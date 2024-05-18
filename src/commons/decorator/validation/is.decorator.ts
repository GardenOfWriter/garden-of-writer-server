import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

type ValidateType = 'number' | 'string' | 'numberString' | 'boolean';

export function Is(type: ValidateType, title: string, required: boolean, description: string): PropertyDecorator {
  return applyDecorators(
    required ? IsNotEmpty() : IsOptional(),
    getValidatorByType(type),
    ApiProperty({
      title,
      description,
      required,
    }),
  );
}

function getValidatorByType(type: ValidateType): PropertyDecorator {
  switch (type) {
    case 'number':
      return IsNumber();
    case 'string':
      return IsString();
    case 'boolean':
      return IsBoolean();
    case 'numberString':
      return IsNumberString();
    default:
      throw new Error('unknow Validate Type');
  }
}
