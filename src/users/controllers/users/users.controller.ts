import { UsersService } from './../../services/users/users.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
}
