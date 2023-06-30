import { Controller, Get /*, UseGuards*/ } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {}
