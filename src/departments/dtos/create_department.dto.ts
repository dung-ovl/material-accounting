import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  readonly maBoPhan: string;

  @IsNotEmpty()
  readonly tenBoPhan: string;

  @IsNotEmpty()
  readonly moTa: string;
}
