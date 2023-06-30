import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisService } from './redis/redis.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const redisService = app.get(RedisService);
  await redisService.initializeData();
  try {
    await MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://daniil:1121@cluster0.xmrlxzd.mongodb.net/?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    });

    console.log('Connected to MongoDB database');

    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
  } catch (error) {
    console.error('Failed to connect to MongoDB database:', error);
  }
}
bootstrap();
