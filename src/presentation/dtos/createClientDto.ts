import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClienteDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsString({ message: 'O endereço deve ser uma string.' })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  endereco: string;

  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  telefone: string;

  @IsNumber({}, { message: 'A renda deve ser um número.' })
  @IsNotEmpty({ message: 'A renda é obrigatória.' })
  renda: number;
}