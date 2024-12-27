import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './guards/jwt-auth.guard';
import { Token } from '@prisma/client';
import { Response } from 'express';
import { ICookieOptions } from './interfaces/interfaces';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = this.authService.register(registerDto);

    if (!createdUser) {
      const textError = 'Ошибка при создании пользователя';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    return createdUser;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const textError = 'Ошибка при попытке входа';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    const { refreshToken, accessToken } = tokens;
    this.setRefreshTokenToCookies(refreshToken, res);

    res.status(HttpStatus.CREATED).json({ accessToken });
  }

  @Get('refresh-tokens')
  refreshTokens(refreshToken) {
    return;
  }

  private setRefreshTokenToCookies(refreshToken: Token, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const { token, expires } = refreshToken;

    const cookieName = 'refreshToken';
    const cookieExpTime = dayjs(expires).toDate();
    const cookieOptions: ICookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      expires: cookieExpTime,
    };

    res.cookie(cookieName, token, cookieOptions);
  }
}
