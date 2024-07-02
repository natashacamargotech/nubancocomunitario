import { Exclude, Type } from 'class-transformer';
import { Conta } from '../../contas/interfaces/conta.interface';
import { Gerente } from '../../gerentes/interfaces/gerente.interface';

export class Cliente {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  renda: number;
  @Type(() => Conta)
  contas: Conta[];
  @Exclude()
  gerente: Gerente;
}