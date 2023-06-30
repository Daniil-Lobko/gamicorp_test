import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string): Promise<User> {
    const createdUser = new this.userModel({ username, password });
    return createdUser.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.findUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    if (user && user.password != password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  }
}
