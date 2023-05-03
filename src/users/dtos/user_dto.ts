import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly tenDangNhap: string;

  readonly hoTen: string;

  @IsNotEmpty()
  readonly quyen: string;

  readonly maBoPhan: string | null;

  readonly boPhan: [] | null;
}
