import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StudentDocument } from "../schemas/student.schema";
import { obocreateusermail } from "src/views/obocreateusermail";
import { sendMail } from "src/utils/sendMail";
import { CounterService } from "src/counter/counter.service";

@Injectable()
export class StudentService {
  constructor(
    @InjectModel("Student") private readonly studentModel: Model<StudentDocument>,
    private counterService: CounterService
  ) {}
 
  async create_student(req_body) {
    const new_student = new this.studentModel();
    new_student._id = await this.counterService.get_next_sequence_value("student_id");
    new_student.first_name = req_body.first_name;
    new_student.last_name = req_body.last_name;
    new_student.email = req_body.email;
    new_student.phone_number = req_body.phone_number;
    new_student.batch = req_body.batch;
    new_student.date = req_body.date;
    return await new_student.save();
    // return "Student created successfully";
  }


  async get_all_students() {
    const student = await this.studentModel.find({});
    return student;
  }
  
}
