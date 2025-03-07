import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    return this.authService.login(email, password);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
