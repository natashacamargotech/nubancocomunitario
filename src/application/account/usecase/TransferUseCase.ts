import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { Repository } from 'typeorm';

@Injectable()
export class TransferUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,
  ) {}

  async execute(
    origemId: string,
    destinoId: string,
    valor: number,
  ): Promise<void> {
    const origem = await this.contaRepository.findOne({
      where: { id: origemId },
    });
    const destino = await this.contaRepository.findOne({
      where: { id: destinoId },
    });

    if (!origem) {
      throw new NotFoundException(
        `Conta de origem com ID ${origemId} não encontrada.`,
      );
    }

    if (!destino) {
      throw new NotFoundException(
        `Conta de destino com ID ${destinoId} não encontrada.`,
      );
    }

    if (origem.saldo < valor) {
      throw new BadRequestException(
        `Saldo insuficiente na conta de origem com ID ${origemId}.`,
      );
    }

    origem.saldo -= valor;
    destino.saldo += valor;

    await this.contaRepository.save(origem);
    await this.contaRepository.save(destino);
  }
}
