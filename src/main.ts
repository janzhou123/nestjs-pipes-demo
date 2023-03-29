import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipeForClass } from './pipes/ValidationPipeForClass';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  //设置全局校验器  设置在这里的全局校验器，不能在module里面进行注入，所以 写到 app.module里面去
  // app.useGlobalPipes(new ValidationPipeForClass());
  await app.listen(3000);

  //热加载添加部分
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
