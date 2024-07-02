export class CreateContaDto {
    clienteId: string;
    tipo: 'corrente' | 'poupanca';
    saldoInicial: number;
  }