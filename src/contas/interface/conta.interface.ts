import { Cliente } from '../../clientes/interfaces/cliente.interface';

export class Conta {
  id: string;
  cliente: Cliente;
  saldo: number;
  tipo: 'corrente' | 'poupanca';
  limiteChequeEspecial?: number;
}