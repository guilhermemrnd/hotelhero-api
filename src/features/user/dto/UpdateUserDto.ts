import { IsOptional } from 'class-validator';

import { CreateUserDto } from './CreateUserDto';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
