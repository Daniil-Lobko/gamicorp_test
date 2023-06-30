import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from '../mongodb/mongo.module';
import { RedisModule } from '../redis/redis.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({ secret: 'your-secret-key' }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://daniil:1121@cluster0.xmrlxzd.mongodb.net/?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongoModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
