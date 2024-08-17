import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IClienteRepository } from '../../../domain/interfaces/cliente.repository.interface';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';

export class ClienteRepository implements IClienteRepository {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }
  async findById(id: string): Promise<ClienteEntity | null> {
    return this.clienteRepository.findOneBy({ id });
  }

  async create(cliente: ClienteEntity): Promise<ClienteEntity> {
    return this.clienteRepository.save(cliente);
  }

  async update(id: string, cliente: Partial<ClienteEntity>): Promise<ClienteEntity | null> {
    return this.clienteRepository.save({ id, ...cliente });
  }

  async delete(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}