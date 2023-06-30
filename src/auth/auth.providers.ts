import { Connection } from 'mongoose';
import { UserSchema } from '../models/user.model';
import { MongoModule } from '../mongodb/mongo.module';

export const authProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [MongoModule],
  },
];
