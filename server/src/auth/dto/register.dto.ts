import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail(
    {},
    {
      message: 'Введите email корректно',
    }
  )
  email: string;

  @IsStrongPassword(
    {},
    {
      message:
        'Пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы',
    }
  )
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password: string;

  @IsStrongPassword(
    {},
    {
      message:
        'Повторный пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы',
    }
  )
  @MinLength(8, {
    message: 'Повторный пароль должен содержать минимум 8 символов',
  })
  repeatPassword: string;

  @IsString({ message: 'Никнейм должно быть строкой' })
  @Length(2, 20, { message: 'Длина никнкейма должна быть от 2 до 20 символов' })
  username: string;

  @IsString({ message: 'Телефон должен быть строкой' })
  @Length(6, 20, { message: 'Длина телефона должна быть от 6 до 20 символов' })
  phone: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @Length(2, 20, { message: 'Длина имени должна быть от 2 до 20 символов' })
  firstName: string;

  @IsString({ message: 'Фамилия должно быть строкой' })
  @Length(2, 20, { message: 'Длина фамилии должна быть от 2 до 20 символов' })
  lastName: string;
}
