import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';
import { UpdateClienteDto } from './application/client/dto/updateClienteDto.ts';

@Injectable()
export class UpdateClienteUseCase {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async execute(
    id: string,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['contasAssociadas', 'gerente'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    Object.assign(cliente, updateClienteDto);

    return await this.clienteRepository.save(cliente);
  }
}