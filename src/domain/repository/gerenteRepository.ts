import { GerenteEntity } from '../entity/gerenteEntity';

export interface IGerenteRepository {
  findById(id: string): Promise<GerenteEntity | null>;
  findAll(): Promise<GerenteEntity[]>;
  save(gerente: GerenteEntity): Promise<GerenteEntity>;
  delete(id: string): Promise<void>;
}
