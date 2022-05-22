import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StaffDocument } from "../schemas/staff.schema";
import { CounterService } from "src/counter/counter.service";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel("Staff") private readonly staffModel: Model<StaffDocument>,
    private counterService: CounterService
  ) {}
 
  async create_staff(req_body) {
    const new_staff = new this.staffModel();
    new_staff._id = await this.counterService.get_next_sequence_value("subject_id");
    new_staff.staff_name = req_body.staff_name;
    new_staff.subject_name = req_body.subject_name;
    return await new_staff.save();
  
  }


  async get_all_staff() {
    const staff = await this.staffModel.find({});
    return staff;
  }
  
}
