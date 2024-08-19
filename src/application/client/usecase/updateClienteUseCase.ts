import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/domain/entity/clienteEntity';
import { Repository } from 'typeorm';
import { UpdateClienteDto } from '../dto/updateClienteDto';

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
