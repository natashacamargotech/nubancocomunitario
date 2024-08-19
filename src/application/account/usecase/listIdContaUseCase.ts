import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { ClienteEntity } from 'src/domain/entity/clienteEntity';

@Injectable()
export class ListContasUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,

    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  async execute(clienteId: string): Promise<ContaEntity[]> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
      relations: ['contasAssociadas'],
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    return cliente.contasAssociadas;
  }
}
