import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export interface UserEntity {
  id: number;
  name: string;
}

//根据获取的ID ，进行userentity获取
@Injectable()
export class UserByIdPipe implements PipeTransform<string, any> {
  transform(value: string, metadata: ArgumentMetadata): UserEntity {
    console.log('UserByIdPipe metadata=====', metadata);
    console.log('UserByIdPipe value=====', value);
    const id = parseInt(value, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Validation failed');
    }

    // do your buissnes
    return {
      id: id,
      name: 'UserByIdPipe',
    };
  }
}
