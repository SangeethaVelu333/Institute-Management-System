import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { UserLoginCredentialsDto } from './dto/userLoginCredentials.dto';
import JwtRefreshGuard from './jwt-refresh-guard';
import JwtAccessGuard from 'src/auth/jwt-access-guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body(ValidationPipe) userLoginCredentialsDto: UserLoginCredentialsDto,
    @Res() res,
  ) {
    const response = await this.authService.signIn(userLoginCredentialsDto);
    return res.status(HttpStatus.OK).json({
      message: response[0],
      role: response[3],
      accessToken: response[1],
      refreshToken: response[2],
      user_details: response[4],
    });
  }
  @Post('forgot_password')
  async forgotPassword(@Body(ValidationPipe) emailDto: EmailDto, @Res() res) {
    const response = await this.authService.forgotPassword(emailDto);
    return res.status(HttpStatus.OK).json({
      message: response,
    });
  }

  @Get('verify/resetpassword/:token')
  async validateResetPasswordToken(@Req() req, @Res() res) {
    const status = await this.authService.validateResetPasswordToken(
      req.params.token,
    );
    if (status)
      res.render('resetPassword', {
        token: `${process.env.BASE_URL}/auth/reset/password/${req.params.token}`,
      });
    else res.render('resetPasswordFailure');
  }

  @Post('reset/password/:token')
  async resetPassword(@Req() req, @Res() res) {
    const response = await this.authService.resetPassword(
      req.params.token,
      req.body,
    );
    if (response) res.render('resetPasswordSuccess');
    else res.render('resetPasswordFailure');
  }

  @Get('/renewAccessToken')
  @UseGuards(JwtRefreshGuard)
  renewAccessToken(@Req() req): Promise<{ accessToken: string }> {
    return this.authService.renewAccessToken(req.user);
  }

}
