import * as Joi from 'joi';

//使用 joi 进行类型检查
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  breed: Joi.string().required(),
});
