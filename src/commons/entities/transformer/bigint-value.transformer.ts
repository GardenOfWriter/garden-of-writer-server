import { ValueTransformer } from 'typeorm';

export class BigintValueTransformer implements ValueTransformer {
  from(value: string): number {
    return parseInt(value, 10);
  }
  to(entityValue: number): number {
    return entityValue;
  }
}
