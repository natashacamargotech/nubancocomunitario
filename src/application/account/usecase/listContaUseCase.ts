import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';

@Injectable()
export class ListByIdContaUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,
  ) {}

  async execute(id: string): Promise<ContaEntity> {
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
