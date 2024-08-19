import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContaDto } from '../dto/createContaDto';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { ContaCorrenteEntity } from 'src/domain/entity/contaCorrenteEntity';
import { ContaPoupancaEntity } from 'src/domain/entity/contaPoupancaEntity';

@Injectable()
export class CreateContaUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private contaRepository: Repository<ContaEntity>,
    @InjectRepository(ContaCorrenteEntity)
    private contaCorrenteRepository: Repository<ContaCorrenteEntity>,
    @InjectRepository(ContaPoupancaEntity)
    private contaPoupancaRepository: Repository<ContaPoupancaEntity>,
  ) {}

  async execute(createContaDto: CreateContaDto): Promise<ContaEntity> {
    let conta;

    if (createContaDto.tipoConta === 'corrente') {
      conta = this.contaCorrenteRepository.create(createContaDto);
      conta = await this.contaCorrenteRepository.save(conta);
    } else if (createContaDto.tipoConta === 'poupanca') {
      conta = this.contaPoupancaRepository.create(createContaDto);
      conta = await this.contaPoupancaRepository.save(conta);
    }

    return conta;
  }
}
