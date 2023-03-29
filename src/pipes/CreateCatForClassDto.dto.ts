import { IsString, IsInt } from 'class-validator';

// 使用 class-validator 校验器进行字段类型检查
export class CreateCatDtoForClass {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
