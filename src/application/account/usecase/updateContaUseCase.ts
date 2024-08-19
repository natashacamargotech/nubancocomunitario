import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { UpdateContaDto } from '../dto/updateContaDto';

@Injectable()
export class UpdateContaUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly contaRepository: Repository<ContaEntity>,
  ) {}

  async execute(
    id: string,
    updateAccountDto: UpdateContaDto,
  ): Promise<ContaEntity> {
    const conta = await this.contaRepository.findOne({ where: { id } });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada.`);
    }

    const updatedConta = this.contaRepository.merge(conta, updateAccountDto);

    return await this.contaRepository.save(updatedConta);
  }
}
