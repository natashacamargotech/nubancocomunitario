import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';

@Injectable()
export class DeleteClienteUseCase {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async execute(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}