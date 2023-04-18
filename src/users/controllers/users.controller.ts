import { UsersService } from '../services/users.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
}
