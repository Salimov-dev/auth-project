import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleAsyncOptions } from '@config/jwt-module.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    PassportModule,
  ],
})
export class AuthModule {}
