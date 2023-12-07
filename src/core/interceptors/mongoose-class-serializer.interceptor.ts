import {
  Injectable,
  PlainLiteralObject,
  ClassSerializerInterceptor,
  ClassSerializerContextOptions,
} from '@nestjs/common';
import { Document } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Idea } from '@/idea/idea.schema';

const modelSerializeClassMap = [Idea].reduce(
  (memo, klass) => ({ ...memo, [klass.name]: klass }),
  {},
);

@Injectable()
export class MongooseClassSerializerInterceptor extends ClassSerializerInterceptor {
  transformToPlain(
    plainOrClass: any,
    options: ClassSerializerContextOptions,
  ): PlainLiteralObject {
    if (plainOrClass instanceof Document) {
      const klass =
        modelSerializeClassMap[
          (plainOrClass.constructor as PlainLiteralObject).modelName
        ] || Object;
      const instance = plainToInstance(klass, plainOrClass.toJSON(), options);
      return instanceToPlain(instance, options);
    }
    return super.transformToPlain(plainOrClass, options);
  }
}
