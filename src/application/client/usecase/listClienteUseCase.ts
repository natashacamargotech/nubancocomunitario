import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/domain/entity/clienteEntity';
import { Repository } from 'typeorm';

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
