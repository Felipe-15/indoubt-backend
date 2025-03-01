import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    const { email, password } = loginDTO;

    return this.authService.login(email, password);
  }

  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }
}
