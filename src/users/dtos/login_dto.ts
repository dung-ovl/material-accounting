import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  readonly tenDangNhap: string;

  @IsNotEmpty()
  readonly matKhau: string;
}
