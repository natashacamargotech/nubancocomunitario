import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';
@Injectable()
export class ListClientesUseCase {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async execute(): Promise<ClienteEntity[]> {
    return await this.clienteRepository.find();
  }
}