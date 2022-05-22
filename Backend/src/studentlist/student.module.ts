import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../schemas/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CounterService } from 'src/counter/counter.service';
import { Counter, CounterSchema } from 'src/schemas/counter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),

  ],
  controllers: [StudentController],
  providers: [StudentService,CounterService],
})
export class StudentModule {}
