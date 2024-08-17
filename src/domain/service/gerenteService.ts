import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateGerenteDto } from 'src/application/manager/dto/createGerentDto';
import { UpdateGerenteDto } from 'src/application/manager/dto/updateGerenteDto';
import { CreateContaDto } from 'src/application/account/dto/createContaDto';
import { GerenteEntity } from './domain/entity/gerenteEntity.ts';
import { AddClienteToGerenteUseCase } from 'src/application/manager/usecase/addClienteByGerenteUseCase.js'; 
import { CreateGerenteUseCase } from 'src/application/manager/usecase/createGerenteUseCase';
import { DeleteGerenteUseCase } from 'src/application/manager/usecase/deletGerenteUseCase.js'; 
import { ListByIdGerenteUseCase } from 'src/application/manager/usecase/listIdGerenterUseCase.js'; 
import { ListGerentesUseCase } from 'src/application/manager/usecase/listGerenteUseCase.js'; 
import { RemoveClienteFromGerenteUseCase } from 'src/application/manager/usecase/removerClientfromGerenteUseCase.js'; 
import { UpdateGerenteUseCase } from 'src/application/manager/usecase/updateGerenteUseCase.js';
import { ListClienteByIdUseCase } from 'src/application/client/usecase/listIdClienteUseCase.js'; 
import { ContaService } from './contaService.js'; 

@Injectable()
export class GerenteService {
  constructor(
    private readonly addClienteToGerenteUseCase: AddClienteToGerenteUseCase,
    private readonly createGerenteUseCase: CreateGerenteUseCase,
    private readonly deleteGerenteUseCase: DeleteGerenteUseCase,
    private readonly listByIdGerenteUseCase: ListByIdGerenteUseCase,
    private readonly listGerentesUseCase: ListGerentesUseCase,
    private readonly removeClienteFromGerenteUseCase: RemoveClienteFromGerenteUseCase,
    private readonly updateGerenteUseCase: UpdateGerenteUseCase,
    private readonly findClienteByIdUseCase: ListClienteByIdUseCase,
    private readonly contaService: ContaService,
  ) {}

  async criarGerente(createGerenteDto: CreateGerenteDto): Promise<GerenteEntity> {
    return this.createGerenteUseCase.execute(createGerenteDto);
  }

  async atualizarGerente(
    id: string,
    updateGerenteDto: UpdateGerenteDto,
  ): Promise<GerenteEntity> {
    const gerente = await this.listByIdGerenteUseCase.execute(id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return this.updateGerenteUseCase.execute(id, updateGerenteDto);
  }

  async listarGerentes(): Promise<GerenteEntity[]> {
    return this.listGerentesUseCase.execute();
  }

  async deletarGerente(id: string): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    await this.deleteGerenteUseCase.execute(id);
    console.log(`Gerente com ID ${id} deletado com sucesso`);
  }

  async encontrarGerentePorId(id: string): Promise<GerenteEntity> {
    const gerente = await this.listByIdGerenteUseCase.execute(id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return gerente;
  }

  async adicionarClienteAoGerente(
    gerenteId: string,
    clienteId: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    const cliente = await this.findClienteByIdUseCase.execute(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }
    await this.addClienteToGerenteUseCase.execute(gerenteId, clienteId);
    console.log(
      `Cliente ${clienteId} adicionado ao gerente ${gerente.nomeCompleto}.`,
    );
  }

  async removerClienteDoGerente(
    gerenteId: string,
    clienteId: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    await this.removeClienteFromGerenteUseCase.execute(gerenteId, clienteId);
    console.log(
      `Cliente ${clienteId} removido do gerente ${gerente.nomeCompleto}.`,
    );
  }

  async abrirConta(
    gerenteId: string,
    clienteId: string,
    numeroConta: string,
    tipoConta: 'corrente' | 'poupanca', // Define os tipos permitidos
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
  
    const cliente = await this.findClienteByIdUseCase.execute(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }
  
    if (tipoConta !== 'corrente' && tipoConta !== 'poupanca') {
      throw new BadRequestException(
        `Tipo de conta ${tipoConta} é inválido. Aceita apenas 'corrente' ou 'poupanca'.`,
      );
    }
  
    const createContaDto: CreateContaDto = {
      agencia: '0001',
      numero: numeroConta, 
      saldo: 0,
      tipoConta,
      limite: tipoConta === 'corrente' ? 1000 : null, 
      taxaJuros: tipoConta === 'poupanca' ? 0.5 : null, 
    };
  
    await this.contaService.create(createContaDto);
    console.log(`Conta do cliente ${clienteId} aberta com sucesso.`);
  }

  async fecharConta(
    gerenteId: string,
    clienteId: string,
    numeroConta: string,
  ): Promise<void> {
    const gerente = await this.listByIdGerenteUseCase.execute(gerenteId);
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }
    const cliente = await this.findClienteByIdUseCase.execute(clienteId);
    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const contas = await this.contaService.listAll(clienteId);
    const conta = contas.find((c) => c.numero === numeroConta);

    if (!conta) {
      throw new NotFoundException(
        `Conta com número ${numeroConta} não encontrada para o cliente ${clienteId}.`,
      );
    }

    await this.contaService.delete(numeroConta);
    console.log(
      `Conta ${numeroConta} do cliente ${clienteId} fechada com sucesso.`,
    );
  }
}