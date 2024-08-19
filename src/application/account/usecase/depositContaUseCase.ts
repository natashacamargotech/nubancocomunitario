import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { Repository } from 'typeorm';

@Injectable()
export class DepositUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,
  ) {}

  async execute(id: string, valor: number): Promise<void> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    conta.saldo += valor;
    await this.contaRepository.save(conta);
  }
}
