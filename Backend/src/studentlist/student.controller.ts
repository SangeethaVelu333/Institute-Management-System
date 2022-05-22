import {
    Controller,
    Delete,
    Get,
    HttpStatus,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
  } from "@nestjs/common";
  import { StudentService } from "./student.service";
  import JwtAccessGuard from "src/auth/jwt-access-guard";
  
  @Controller("students")
  export class StudentController {
    constructor(private studentService: StudentService) {}

    @Post("create")
    // @UseGuards(JwtAccessGuard)
    async create_student(@Req() req, @Res() res) {
        console.log("i'm here");
      const response = await this.studentService.create_student(req.body);
      return res.status(HttpStatus.OK).json({
        message: "Student created successfully",
        student: response,
      });
    }

    @Get("all")
    // @UseGuards(JwtAccessGuard)
    async get_all_students(@Req() req, @Res() res) {
      const response = await this.studentService.get_all_students();
      return res.status(HttpStatus.OK).json({
        message: "List of all students",
        students: response,
      });
    }

  }