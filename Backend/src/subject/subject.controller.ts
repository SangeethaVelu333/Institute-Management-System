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
  import { SubjectService } from "./subject.service";
  import JwtAccessGuard from "src/auth/jwt-access-guard";
  
  @Controller("subject")
  export class SubjectController {
    constructor(private subjectService: SubjectService) {}

    @Post("create")
    // @UseGuards(JwtAccessGuard)
    async create_subject(@Req() req, @Res() res) {
        console.log("i'm here");
      const response = await this.subjectService.create_subject(req.body);
      return res.status(HttpStatus.OK).json({
        message: "subject created successfully",
        subject: response,
      });
    }

    @Get("all")
    // @UseGuards(JwtAccessGuard)
    async get_all_subject(@Req() req, @Res() res) {
      const response = await this.subjectService.get_all_subject();
      return res.status(HttpStatus.OK).json({
        message: "List of all subject",
       subjects: response,
      });
    }

  }