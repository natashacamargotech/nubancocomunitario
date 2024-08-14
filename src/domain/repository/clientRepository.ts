import { Cliente } from "../entity/clientEntity";

export interface ClienteRepository {
  save(cliente: Cliente): Promise<void>;
  findById(id: string): Promise<Cliente | null>;
  findAll(): Promise<Cliente[]>;
  remove(id: string): Promise<boolean>;
}