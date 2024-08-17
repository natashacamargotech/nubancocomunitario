import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContaDto } from '../dto/createContaDto'; 
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { ContaCorrente } from 'src/domain/entity/contaCorrente'; 
import { ContaPoupanca } from 'src/domain/entity/contaPoupanca';

@Injectable()
export class CreateContaUseCase {
  constructor(
    @InjectRepository(ContaEntity)
    private contaRepository: Repository<ContaEntity>,
    @InjectRepository(ContaCorrente)
    private contaCorrenteRepository: Repository<ContaCorrente>,
    @InjectRepository(ContaPoupanca)
    private contaPoupancaRepository: Repository<ContaPoupanca>,
  ) {}

  async execute(createContaDto: CreateContaDto): Promise<Conta> {
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