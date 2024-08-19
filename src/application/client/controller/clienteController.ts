import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ClienteService } from 'src/domain/service/clienteService';
import { ContaService } from 'src/domain/service/contaService';
import { CreateContaDto } from 'src/application/account/dto/createContaDto';
import { CreateClienteDto } from '../dto/creatClienteDto';
import { ClienteEntity } from 'src/domain/entity/clienteEntity';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  @Post('criarCliente')
  async criarCliente(
    @Body() createClienteDto: CreateClienteDto,
  ): Promise<ClienteEntity> {
    const cliente = await this.clienteService.create(createClienteDto);
    return cliente;
  }

  @Get(':id/contas')
  async listarContas(@Param('id') clienteId: string) {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const contas = await this.contaService.listAllByClienteId(clienteId);
    return contas;
  }

  @Post(':id/contas')
  async abrirConta(
    @Param('id') clienteId: string,
    @Body() createContaDto: CreateContaDto,
  ) {
    const conta = await this.contaService.create(createContaDto);

    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    cliente.contasAssociadas.push(conta);
    await this.clienteService.update(clienteId, cliente);

    return conta;
  }

  @Delete(':id/contas/:numeroConta')
  async fecharConta(
    @Param('id') clienteId: string,
    @Param('numeroConta') numeroConta: string,
  ) {
    const cliente = await this.clienteService.listById(clienteId);
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    await this.contaService.delete(numeroConta);
    return { message: 'Conta fechada com sucesso' };
  }
}
