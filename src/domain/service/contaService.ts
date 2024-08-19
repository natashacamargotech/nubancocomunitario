import { Injectable } from '@nestjs/common';
import { CreateContaDto } from 'src/application/account/dto/createContaDto';
import { UpdateContaDto } from 'src/application/account/dto/updateContaDto';
import { ListContasUseCase } from 'src/application/account/usecase/listIdContaUseCase';
import { ListByIdContaUseCase } from 'src/application/account/usecase/listContaUseCase';
import { CreateContaUseCase } from 'src/application/account/usecase/createContaUseCase';
import { UpdateContaUseCase } from 'src/application/account/usecase/updateContaUseCase';
import { DeleteContaUseCase } from 'src/application/account/usecase/deletContaUseCase';
import { DepositUseCase } from 'src/application/account/usecase/depositContaUseCase';
import { WithdrawUseCase } from 'src/application/account/usecase/withdrawUsecase';
import { TransferUseCase } from 'src/application/account/usecase/TransferUseCase';
import { PaymentPixUseCase } from 'src/application/account/usecase/paymentPixUseCase';
import { PaymentBoletoUseCase } from 'src/application/account/usecase/paymentBoletoUseCase';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaEntity } from '../entity/ContaEntity';
import { ContaCorrenteEntity } from '../entity/contaCorrenteEntity';
import { ContaPoupancaEntity } from '../entity/contaPoupancaEntity';

@Injectable()
export class ContaService {
  constructor(
    @InjectRepository(ContaEntity)
    private contaRepository: Repository<ContaEntity>,
    @InjectRepository(ContaCorrenteEntity)
    private contaCorrenteRepository: Repository<ContaCorrenteEntity>,
    @InjectRepository(ContaPoupancaEntity)
    private contaPoupancaRepository: Repository<ContaPoupancaEntity>,

    private readonly createContaUseCase: CreateContaUseCase,
    private readonly updateContaUseCase: UpdateContaUseCase,
    private readonly deleteContaUseCase: DeleteContaUseCase,
    private readonly listContasUseCase: ListContasUseCase,
    private readonly listByIdContaUseCase: ListByIdContaUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly withdrawUseCase: WithdrawUseCase,
    private readonly transferUseCase: TransferUseCase,
    private readonly paymentPixUseCase: PaymentPixUseCase,
    private readonly paymentBoletoUseCase: PaymentBoletoUseCase,
  ) {}

  async create(createContaDto: CreateContaDto): Promise<ContaEntity> {
    let conta;
    if (createContaDto.tipoConta === 'corrente') {
      conta = this.contaCorrenteRepository.create({
        ...createContaDto,
      });
      return await this.contaCorrenteRepository.save(conta);
    } else if (createContaDto.tipoConta === 'poupanca') {
      conta = this.contaPoupancaRepository.create({
        ...createContaDto,
      });
      return await this.contaPoupancaRepository.save(conta);
    } else {
      throw new Error('Tipo de conta inválido');
    }
  }

  async update(id: string, updateContaDto: UpdateContaDto) {
    return await this.updateContaUseCase.execute(id, updateContaDto);
  }

  async delete(numeroConta: string) {
    return await this.deleteContaUseCase.execute(numeroConta);
  }

  async listAll(clienteId: string) {
    return await this.listContasUseCase.execute(clienteId);
  }

  async listById(id: string) {
    return await this.listByIdContaUseCase.execute(id);
  }

  async listAllByClienteId(clienteId: string) {
    return await this.listContasUseCase.execute(clienteId);
  }

  async depositar(id: string, valor: number) {
    await this.depositUseCase.execute(id, valor);
    console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  async sacar(id: string, valor: number) {
    await this.withdrawUseCase.execute(id, valor);
    console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  }

  async transferir(origemId: string, destinoId: string, valor: number) {
    await this.transferUseCase.execute(origemId, destinoId, valor);
    console.log(
      `Transferência de R$ ${valor.toFixed(2)} realizada com sucesso.`,
    );
  }

  async realizarPagamentoPIX(id: string, valor: number) {
    await this.paymentPixUseCase.execute(id, valor);
    console.log(
      `Pagamento de PIX no valor de R$ ${valor.toFixed(2)} realizado com sucesso.`,
    );
  }

  async realizarPagamentoBoleto(
    id: string,
    numeroBoleto: string,
    valor: number,
  ) {
    await this.paymentBoletoUseCase.execute(id, valor);
    console.log(
      `Pagamento do boleto ${numeroBoleto} no valor de R$ ${valor.toFixed(2)} realizado com sucesso.`,
    );
  }
}
