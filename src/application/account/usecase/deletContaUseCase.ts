import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';

@Injectable()
export class DeleteContaUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,
  ) {}

  async execute(numeroConta: string): Promise<void> {
    const conta = await this.contaRepository.findOne({
      where: { numero: numeroConta },
    });
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    await this.contaRepository.delete(conta.id);
  }
}
