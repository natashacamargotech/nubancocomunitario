import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateClienteDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsNumber()
  @IsOptional()
  renda?: number;
}