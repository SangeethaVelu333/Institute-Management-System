import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubjectDocument } from "../schemas/subject.schema";
import { CounterService } from "src/counter/counter.service";

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel("Subject") private readonly subjectModel: Model<SubjectDocument>,
    private counterService: CounterService
  ) {}
 
  async create_subject(req_body) {
    const new_subject = new this.subjectModel();
    new_subject._id = await this.counterService.get_next_sequence_value("subject_id");
    new_subject.subject_name = req_body.subject_name;
    
    return await new_subject.save();
  
  }


  async get_all_subject() {
    const subject = await this.subjectModel.find({});
    return subject;
  }
  
}
