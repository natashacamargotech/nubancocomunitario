import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { Repository } from 'typeorm';
import { WithdrawUseCase } from './withdrawUsecase';

@Injectable()
export class PaymentBoletoUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,
    private readonly withdrawUseCase: WithdrawUseCase,
  ) {}

  async execute(id: string, valor: number): Promise<void> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    if (conta.saldo < valor) {
      throw new BadRequestException(
        `Saldo insuficiente na conta com ID ${id}.`,
      );
    }

    await this.withdrawUseCase.execute(id, valor);
  }
}
