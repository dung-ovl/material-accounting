import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  readonly maTk: string;

  @IsNotEmpty()
  readonly tenTk: string;

  @IsNotEmpty()
  readonly capTk: number;

  readonly tkMe: string;

  @IsNotEmpty()
  readonly loaiTk: string;
}
