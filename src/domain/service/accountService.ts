import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../entity/accountEntity'; 
import { Cliente } from '../entity/clientEntity'; 
import { Transacao } from '../entity/transacaoEntity'; 
import { CreateContaDto } from 'src/presentation/dtos/createAccountDto';

@Injectable()
export class ContaService {
  constructor(
    @InjectRepository(Conta)
    private contaRepository: Repository<Conta>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Transacao)
    private transacaoRepository: Repository<Transacao>,
  ) {}


  async create(createContaDto: CreateContaDto): Promise<Conta> {
    const cliente = await this.clienteRepository.findOne({ where: { id: createContaDto.clienteId } });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${createContaDto.clienteId} não encontrado`);
    }

    const conta = this.contaRepository.create({
      ...createContaDto,
      titular: cliente,
      numeroConta: this.generateAccountNumber(),
      dataAbertura: new Date(),
      status: 'ativa',
      saldo: createContaDto.saldoInicial,
    });

    return this.contaRepository.save(conta);
  }

  async findAll(): Promise<Conta[]> {
    return this.contaRepository.find({ relations: ['titular'] });
  }

  async findOne(id: string): Promise<Conta> {
    const conta = await this.contaRepository.findOne({ where: { id }, relations: ['titular'] });
    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }
    return conta;
  }

  private generateAccountNumber(): string {
    return Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  }
}