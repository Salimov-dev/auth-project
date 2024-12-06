import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);

    const userData = { ...createUserDto, password: hashedPassword };
    delete userData.repeatPassword;

    const existingUserByUsername = await this.findByUsername(
      createUserDto.username
    );
    if (existingUserByUsername) {
      throw new ConflictException(
        'Пользователь с таким никнеймом уже существует'
      );
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const existingUserByPhone = await this.findByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      throw new ConflictException(
        'Пользователь с таким телефоном уже существует'
      );
    }

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((err) => {
        throw new BadRequestException(
          'Ошибка при создании нового пользователя'
        );
      });
    delete newUser.password;

    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string) {
    return this.prismaService.user
      .findUnique({
        where: { username },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }
        delete foundedUser.password;

        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('Пользователь по никнейму не найден');
      });
  }

  async findByEmail(email: string) {
    return this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }
        delete foundedUser.password;

        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('Пользователь по email не найден');
      });
  }

  async findByPhone(phone: string) {
    return this.prismaService.user
      .findUnique({
        where: { phone },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }
        delete foundedUser.password;

        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException(
          'Пользователь по номеру телефона не найден'
        );
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
