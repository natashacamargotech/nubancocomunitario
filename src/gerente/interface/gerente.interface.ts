import { Type } from 'class-transformer';
import { Cliente } from '../../clientes/interfaces/cliente.interface';

export class Gerente {
  id: string;
  nome: string;
  @Type(() => Cliente)
  clientes: Cliente[];
}
