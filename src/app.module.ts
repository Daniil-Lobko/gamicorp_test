import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './mongodb/mongo.module';
@Module({
  imports: [MongooseModule, MongoModule, AuthModule, RedisModule],
  controllers: [AppController],
})
export class AppModule {}
