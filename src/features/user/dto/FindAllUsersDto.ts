import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class FindAllUsersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Max(100)
  @Min(1)
  @IsInt()
  limit?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  page?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderBy?: 'asc' | 'desc';
}
