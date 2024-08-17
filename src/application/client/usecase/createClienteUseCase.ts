import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';
import { CreateClienteDto } from '../dto/creatClienteDto.js'; 

@Injectable()
export class CreateClienteUseCase {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async execute(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }
}