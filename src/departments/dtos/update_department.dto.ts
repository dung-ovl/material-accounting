import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
  @IsNotEmpty()
  readonly maBoPhan: string;

  @IsNotEmpty()
  readonly tenBoPhan: string;

  @IsNotEmpty()
  readonly moTa: string;
}
