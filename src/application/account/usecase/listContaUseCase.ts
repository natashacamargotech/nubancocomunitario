import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from 'src/domain/entity/ContaEntity';

@Injectable()
export class ListByIdContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
  ) {}

  async execute(id: string): Promise<Conta> {
    const conta = await this.contaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    return conta;
  }
}