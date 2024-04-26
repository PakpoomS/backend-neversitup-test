import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from 'src/auth/guards/local.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  login(@Request() req, @Body() login: LoginDto) {
    return this.authService.validateUser(login);
  }
}
