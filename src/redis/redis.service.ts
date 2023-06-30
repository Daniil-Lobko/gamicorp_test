import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import * as _ from 'lodash';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis.Redis;

  constructor() {
    // @ts-ignore
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
  }

  async initializeData(): Promise<void> {
    const keys = await this.redisClient.keys('*');
    if (keys.length === 0) {
      const data = [];
      for (let i = 0; i < 100; i++) {
        const randomValue = Math.random().toString(36).substring(7);
        const key = `record:${i}`;
        data.push({ key, value: randomValue });
        await this.redisClient.set(key, randomValue);
      }
    }
  }

  async getRecords(): Promise<any[]> {
    const keys = await this.redisClient.keys('*');
    const records = await this.redisClient.mget(keys);
    const combined = keys.map((key, index) => ({
      key,
      value: records[index],
    }));
    const shuffledCombined = _.shuffle(combined);
    const randomRecords = shuffledCombined.slice(0, 10);
    return randomRecords;
  }
}
