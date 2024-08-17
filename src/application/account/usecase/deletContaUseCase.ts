import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from 'src/domain/entity/ContaEntity';

@Injectable()
export class DeleteContaUseCase {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
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