import { ContaEnity } from './domain/entity/contaEntity.ts';

export interface IContaRepository {
  salvar(conta: ContaEnity): Promise<ContaEnity>;
  buscarPorNumero(numero: string): Promise<ContaEnity | null>;
  atualizar(conta: ContaEnity): Promise<ContaEnity>;
  deletar(id: number): Promise<void>;
  buscarTodos(): Promise<ContaEnity[]>;

}