import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CounterModule } from './counter/counter.module';
import { StudentController } from './studentlist/student.controller';
import { StudentModule } from './studentlist/student.module';
import { StaffModule } from './staff/staff.module';
import { SubjectModule } from './subject/subject.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL, { useFindAndModify: false }),
    UsersModule,
    AuthModule,
    CounterModule,
    StudentModule,
    StaffModule,
    SubjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
