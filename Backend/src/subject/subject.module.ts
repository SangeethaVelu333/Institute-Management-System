import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from '../schemas/subject.schema';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { CounterService } from 'src/counter/counter.service';
import { Counter, CounterSchema } from 'src/schemas/counter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),

  ],
  controllers: [SubjectController],
  providers: [SubjectService,CounterService],
})
export class SubjectModule {}
