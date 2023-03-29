import { CreateCatDto, createCatSchema } from './CreateCatDto.dto';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from './JoiValidationPipe';
import { ValidationPipeForClass } from './ValidationPipeForClass';
import { CreateCatDtoForClass } from './CreateCatForClassDto.dto';
import { myParseIntPipe } from './myParseIntPipe';
import { UserByIdPipe, UserEntity } from './UserByIdPipe';

@Controller('pipes')
export class PipesController {
  @Get(':id')
  async getPipes(@Param('id', ParseIntPipe) id: number) {
    return id;
  }

  @Get('demo2/:id')
  async getPipes2(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return id;
  }

  @Get('demo3')
  async getDemo3(@Query('id', ParseIntPipe) id: number) {
    return id;
  }

  @Get('uuid/:uuid')
  async getUUId(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return uuid;
  }

  //使用 joi 进行类型检查
  @Post('valobject')
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    return createCatDto;
  }
  // 使用 class-validator 校验器进行字段类型检查
  @Post('class')
  async createForClass(
    @Body(new ValidationPipeForClass())
    createCatDtoForClass: CreateCatDtoForClass,
  ) {
    return createCatDtoForClass;
  }

  // 使用 class-validator 校验器进行字段类型检查
  @Post('global-class')
  async createForGlobalClass(
    @Body()
    createCatDtoForClass: CreateCatDtoForClass,
  ) {
    return createCatDtoForClass;
  }

  //将参数转换成 int 类型
  @Get('myparseintpipe/:id')
  async getMyParseIntPipe(@Param('id', new myParseIntPipe()) id) {
    console.log('id====', id);
    return id;
  }
  //根据获取的ID ，进行userentity获取
  @Get('userByIdPipe/:id')
  async userByIdPipe(@Param('id', UserByIdPipe) userEntity: UserEntity) {
    console.log('userByIdPipe userEntity====', userEntity);
    return userEntity;
  }

  @Get('defaults')
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false))
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(1000)) page: number,
  ) {
    return { activeOnly, page };
  }
}
