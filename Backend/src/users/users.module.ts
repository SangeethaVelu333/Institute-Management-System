import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CounterService } from 'src/counter/counter.service';
import { Counter, CounterSchema } from 'src/schemas/counter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),

  ],
  controllers: [UsersController],
  providers: [UsersService,CounterService],
})
export class UsersModule {}
