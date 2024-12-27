import { Token } from './../../node_modules/.prisma/client/index.d';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@user/user.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  register(registerDto: RegisterDto) {
    const createUserDto = registerDto;
    delete createUserDto.repeatPassword;

    const createdUser = this.userService.create(createUserDto);

    return createdUser;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user: User = await this.userService
      .findByUsername(username)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    const isPasswordMatch = user && compareSync(password, user?.password);

    if (!user || !isPasswordMatch) {
      const textError = 'Неверные логин или пароль';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const refreshToken: Token = await this.getRefreshToken(user.id);
    const tokens = { accessToken, refreshToken };

    return tokens;
  }

  refreshTokens() {
    return null;
  }

  private getRefreshToken = async (userId: string) => {
    const currentDate = dayjs();

    const expirationUnit = this.configService.get('TOKEN_EXPIRATION_UNIT');
    const expirationValue = this.configService.get('TOKEN_EXPIRATION_VALUE');

    const expireDate = currentDate
      .add(expirationValue, expirationUnit)
      .toDate();

    return await this.prismaService.token.create({
      data: {
        token: v4(),
        expires: expireDate,
        userId,
      },
    });
  };
}
