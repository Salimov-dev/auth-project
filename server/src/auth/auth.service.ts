import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  register(registerDto: RegisterDto) {
    const { username, password, firstName, lastName, email, phone } =
      registerDto;

    const hashedPassword = this.hashPassword(password);

    return this.prismaService.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        phone,
      },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
