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
import { UsersService } from "./users.service";
import JwtAccessGuard from "src/auth/jwt-access-guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("create")
  async create_userfirst(@Req() req, @Res() res) {
    const response = await this.usersService.create_userfirst(req.body);
    return res.status(HttpStatus.OK).json({
      message: response,
    });
  }

  @Post("create/user")
  // @UseGuards(JwtAccessGuard)
  async create_user(@Req() req, @Res() res) {
    const response = await this.usersService.create_user(req.body);
    return res.status(HttpStatus.OK).json({
      message: "user created successfully",
      user: response,
    });
  }

  @Get("all")
  @UseGuards(JwtAccessGuard)
  async get_all_users(@Req() req, @Res() res) {
    const response = await this.usersService.get_all_users();
    return res.status(HttpStatus.OK).json({
      message: "List of all users",
      user: response,
    });
  }

  @Put(":id")
  @UseGuards(JwtAccessGuard)
  async update_user(@Req() req, @Res() res) {
    const response = await this.usersService.update_user(
      req.params.id,
      req.body
    );
    return res.status(HttpStatus.OK).json({
      message: "User Updated",
      user: response,
    });
  }

  @Delete(":id")
  @UseGuards(JwtAccessGuard)
  async delete_user(@Req() req, @Res() res) {
    const response = await this.usersService.delete_user(req.params.id);
    return res.status(HttpStatus.OK).json({
      message: "User Deleted",
      user: response,
    });
  }
}
