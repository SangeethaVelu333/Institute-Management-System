import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { resetPasswordMail } from 'src/views/resetPasswordMail';
import { EmailDto } from './dto/email.dto';
const Handlebars = require('handlebars');
import { sendMail } from '../utils/sendMail';
import { UserLoginCredentialsDto } from './dto/userLoginCredentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signIn(userLoginCredentialsDto: UserLoginCredentialsDto) {
    const user = await this.validateUserPassword(userLoginCredentialsDto);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const email = user.email;
    const payload = { email };
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '24h',
    });
    const userDetails = await this.userModel.findOne(
      { _id: user.id },
      { type: 0, password: 0, resetPasswordStatus: 0, salt: 0 },
    );
    return [
      'Access Granted',
      accessToken,
      refreshToken,
      user.role,
      userDetails,
    ];
  }

  async validateUserPassword(userLoginCredentialsDto: UserLoginCredentialsDto) {
    const { email, password } = userLoginCredentialsDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      const hash = await bcrypt.hash(password, user.salt);
      if (hash === user.password) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async forgotPassword(emailDto: EmailDto) {
    const { email } = emailDto;
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException(
        "User with the given email doesn't exist",
      );
    }
    const payload = { email };
    const forgotPasswordToken = await this.jwtService.sign(payload, {
      secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
      expiresIn: '15m',
    });
    user.resetPasswordStatus = true;
    await user.save();
    const template = Handlebars.compile(resetPasswordMail);
    const data = {
      url:
        process.env.BASE_URL +
        '/auth/verify/resetpassword/' +
        forgotPasswordToken,
    };
    const htmlBody = template(data);
    try {
      const result = await sendMail(
        email,
        'Reset Password',
        'Confirmation Mail for Forgot Password',
        htmlBody,
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    return 'success!check your mail for resetting the password';
  }

  async validateResetPasswordToken(token) {
    const result = await this.jwtService.verify(token, {
      secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
    });
    if (result) {
      const email = result.email;
      const user = await this.userModel.findOne({ email });
      if (user.resetPasswordStatus) return true;
      else return false;
    }
  }

  async resetPassword(token, body) {
    const result = await this.jwtService.verify(token, {
      secret: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
    });
    if (result) {
      const email = result.email;
      const user = await this.userModel.findOne({ email });
      user.password = await this.hashPassword(body.newPassword, user.salt);
      user.resetPasswordStatus = false;
      await user.save();
      return true;
    } else return false;
  }

  async renewAccessToken(req): Promise<{ accessToken: string }> {
    const email = req;

    const payload = { email };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });

    return { accessToken };
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
