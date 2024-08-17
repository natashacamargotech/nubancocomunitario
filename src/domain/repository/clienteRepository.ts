import { ClienteEntity } from './domain/entity/clienteEntity.ts';

export interface IClienteRepository {
  findAll(): Promise<ClienteEntity[]>;
  findById(id: string): Promise<ClienteEntity | null>;
  create(cliente: ClienteEntity): Promise<ClienteEntity>;
  update(id: string, cliente: Partial<ClienteEntity>): Promise<ClienteEntity | null>;
  delete(id: string): Promise<void>;
}