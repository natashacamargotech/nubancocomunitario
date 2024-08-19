import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/domain/entity/clienteEntity';
import { Repository } from 'typeorm';

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
