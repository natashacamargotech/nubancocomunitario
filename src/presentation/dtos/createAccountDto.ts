import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContaDto {
  @IsString()
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  clienteId: string;

  @IsString()
  @IsNotEmpty({ message: 'O tipo de conta é obrigatório.' })
  tipo: 'corrente' | 'poupanca';

  @IsNumber()
  @IsNotEmpty({ message: 'O saldo inicial é obrigatório.' })
  saldoInicial: number;

  @IsString()
  @IsNotEmpty({ message: 'O código da agência é obrigatório.' })
  agencia: string;

  limiteCredito?: number;
}