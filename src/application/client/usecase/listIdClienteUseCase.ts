import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';

@Injectable()
export class ListClienteByIdUseCase {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clientRepository: Repository<ClienteEntity>, // Usa Repository<Client> diretamente
  ) {}

  async execute(id: string): Promise<ClienteEntity> {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return client;
  }
}