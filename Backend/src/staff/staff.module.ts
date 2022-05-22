import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from '../schemas/Staff.schema';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { CounterService } from 'src/counter/counter.service';
import { Counter, CounterSchema } from 'src/schemas/counter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),

  ],
  controllers: [StaffController],
  providers: [StaffService,CounterService],
})
export class StaffModule {}
