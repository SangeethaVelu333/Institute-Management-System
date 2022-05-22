import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../schemas/user.schema";
import * as bcrypt from "bcrypt";
const Handlebars = require("handlebars");
var crypto = require("crypto");
import { obocreateusermail } from "src/views/obocreateusermail";
import { sendMail } from "src/utils/sendMail";
import { CounterService } from "src/counter/counter.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserDocument>,
    private counterService: CounterService
  ) {}
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async create_userfirst(req_body) {
    const user = await this.userModel.findOne({
      email: req_body.email,
      phone_number: req_body.phone_number,
    });
    if (user) {
      throw new UnauthorizedException("User already exists!");
    }
    const new_user = new this.userModel();
    new_user._id = await this.counterService.get_next_sequence_value("user_id");
    new_user.first_name = req_body.first_name;
    new_user.last_name = req_body.last_name;
    new_user.role = req_body.role;
    new_user.email = req_body.email;
    new_user.country_code = req_body.country_code;
    new_user.phone_number = req_body.phone_number;
    new_user.salt = await bcrypt.genSalt();
    new_user.password = await this.hashPassword(
      req_body.password,
      new_user.salt
    );
    await new_user.save();
    return "User created successfully !";
  }

  async create_user(req_body) {
    const user = await this.userModel.findOne({
      email: req_body.email,
      phone_number: req_body.phone_number,
    });
    if (user) {
      throw new UnauthorizedException("User already exists!");
    }
    const new_user = new this.userModel();
    new_user._id = await this.counterService.get_next_sequence_value("user_id");
    new_user.first_name = req_body.first_name;
    new_user.last_name = req_body.last_name;
    new_user.role = req_body.role;
    new_user.email = req_body.email;
    new_user.country_code = req_body.country_code;
    new_user.phone_number = req_body.phone_number;
    new_user.salt = await bcrypt.genSalt();
    var password = crypto.randomBytes(5).toString("hex");
    new_user.password = await this.hashPassword(password, new_user.salt);
    await new_user.save();
    const template = Handlebars.compile(obocreateusermail);
    const data = {
      email: req_body.email,
      password: password,
    };
    const htmlBody = template(data);
    try {
      const result = await sendMail(
        req_body.email,
        "Welcome mail",
        "Login Credentials for Dim Institute",
        htmlBody
      );
      console.log("iam result", result);
    } catch (err) {
      console.log("iam err", err);
    }
    return "User created and Credentials sent through mail!";
  }

  async get_all_users() {
    const users = await this.userModel.find({});
    return users;
  }

  async update_user(id, req_body) {
    const user = await this.userModel.findByIdAndUpdate(id, req_body, {
      new: true,
    });
    return user;
  }

  async delete_user(id) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
