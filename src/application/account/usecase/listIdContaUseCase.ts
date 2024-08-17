import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from 'src/domain/entity/ContaEntity';
import { Cliente } from 'src/domain/entity/clienteEntity';

@Injectable()
export class ListContasUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async execute(clienteId: string): Promise<Conta[]> {
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