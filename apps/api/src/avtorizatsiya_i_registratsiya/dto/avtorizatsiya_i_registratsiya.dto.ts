import { IsString, IsOptional, IsObject, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAvtorizatsiyaIRegistratsiyaDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateAvtorizatsiyaIRegistratsiyaDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class QueryAvtorizatsiyaIRegistratsiyaDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1)
  page?: number = 1;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100)
  limit?: number = 20;

  @IsOptional() @IsString()
  search?: string;

  @IsOptional() @IsString()
  status?: string;
}
