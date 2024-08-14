import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../entity/accountEntity'; 
import { Transacao } from '../entity/transacaoEntity'; 
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable()
export class TransacaoService {
  constructor(
    @InjectRepository(Conta)
    private contaRepository: Repository<Conta>,
    @InjectRepository(Transacao)
    private transacaoRepository: Repository<Transacao>,
  ) {}

  async depositar(contaId: string, valor: number): Promise<Transacao> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId } });

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    conta.saldo += valor;
    await this.contaRepository.save(conta);

    const transacao = this.transacaoRepository.create({
      conta,
      valor,
      tipo: 'deposito',
      data: new Date(),
    });

    return this.transacaoRepository.save(transacao);
  }

  async sacar(contaId: string, valor: number): Promise<Transacao> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId } });

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    if (conta.saldo < valor) {
      throw new Error('Saldo insuficiente');
    }

    conta.saldo -= valor;
    await this.contaRepository.save(conta);

    const transacao = this.transacaoRepository.create({
      conta,
      valor,
      tipo: 'saque',
      data: new Date(),
    });

    return this.transacaoRepository.save(transacao);
  }

  async transferir(contaOrigemId: string, contaDestinoId: string, valor: number): Promise<Transacao> {
    const contaOrigem = await this.contaRepository.findOne({ where: { id: contaOrigemId } });
    const contaDestino = await this.contaRepository.findOne({ where: { id: contaDestinoId } });

    if (!contaOrigem || !contaDestino) {
      throw new Error('Conta origem ou destino não encontrada');
    }

    if (contaOrigem.saldo < valor) {
      throw new Error('Saldo insuficiente na conta de origem');
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    await this.contaRepository.save(contaOrigem);
    await this.contaRepository.save(contaDestino);

    const transacao = this.transacaoRepository.create({
      conta: contaOrigem,
      contaDestino,
      valor,
      tipo: 'transferencia',
      data: new Date(),
    });

    return this.transacaoRepository.save(transacao);
  }

  async getExtrato(contaId: string): Promise<any[]> {
    const conta = await this.contaRepository.findOne({ where: { id: contaId }, relations: ['transacoes'] });

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    return conta.transacoes.map((transacao) => ({
      ...transacao,
      data: format(transacao.data, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
    }));
  }
}