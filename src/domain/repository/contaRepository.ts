import { ContaEntity } from '../entity/ContaEntity';

export interface IContaRepository {
  salvar(conta: ContaEntity): Promise<ContaEntity>;
  buscarPorNumero(numero: string): Promise<ContaEntity | null>;
  atualizar(conta: ContaEntity): Promise<ContaEntity>;
  deletar(id: number): Promise<void>;
  buscarTodos(): Promise<ContaEntity[]>;
}
