import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Gerente } from './interfaces/gerente.interface';
import { ClienteService } from '../clientes/cliente.service';
import { ContaService } from '../contas/conta.service';
import { CreateContaDto } from '../contas/dto/create-conta.dto';
import { CreateGerenteDto } from './dto/create-gerente.dto';
import { Conta } from '../contas/interfaces/conta.interface';

@Injectable()
export class GerenteService {
  private readonly gerentes: Gerente[] = [];

  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  create(createGerenteDto: CreateGerenteDto): Gerente {
    const gerente: Gerente = plainToClass(Gerente, {
      id: Math.random().toString(36).substring(2),
      nome: createGerenteDto.nome,
      clientes: [],
    });
    this.gerentes.push(gerente);
    return gerente;
  }

  findAll(): Gerente[] {
    return this.gerentes.map(gerente => plainToClass(Gerente, gerente));
  }

  addCliente(gerenteId: string, clienteId: string): Gerente {
    const gerente = this.gerentes.find(g => g.id === gerenteId);
    const cliente = this.clienteService.findAll().find(c => c.id === clienteId);

    if (gerente && cliente) {
      gerente.clientes.push(cliente);
      cliente.gerente = gerente;
    }
    return plainToClass(Gerente, gerente);
  }

  removeCliente(gerenteId: string, clienteId: string): { success: boolean; message: string } {
    const gerente = this.gerentes.find(g => g.id === gerenteId);
    const cliente = this.clienteService.findAll().find(c => c.id === clienteId);

    if (gerente && cliente) {
      gerente.clientes = gerente.clientes.filter(c => c.id !== clienteId);
      cliente.gerente = null;

      // Remover cliente da lista global de clientes
      const removed = this.clienteService.remove(clienteId);
      return { success: removed, message: removed ? 'Cliente removido com sucesso' : 'Falha ao remover o cliente' };
    }
    return { success: false, message: 'Gerente ou cliente não encontrado' };
  }

  modifyConta(gerenteId: string, contaId: string, tipo: 'corrente' | 'poupanca'): Conta {
    const gerente = this.gerentes.find(g => g.id === gerenteId);
    const conta = this.contaService.findAll().find(c => c.id === contaId);

    if (gerente && conta) {
      conta.tipo = tipo;
      conta.limiteChequeEspecial = tipo === 'corrente' ? 100 : undefined;
    }
    return plainToClass(Conta, conta);
  }

  openConta(gerenteId: string, createContaDto: CreateContaDto): Conta {
    const gerente = this.gerentes.find(g => g.id === gerenteId);
    const cliente = this.clienteService.findAll().find(c => c.id === createContaDto.clienteId);

    if (gerente && cliente) {
      const conta = this.contaService.create(createContaDto);
      cliente.contas.push(conta);
      return plainToClass(Conta, conta);
    }
    return null;
  }

  closeConta(gerenteId: string, contaId: string): boolean {
    const gerente = this.gerentes.find(g => g.id === gerenteId);
    const conta = this.contaService.findAll().find(c => c.id === contaId);

    if (gerente && conta) {
      this.contaService.remove(contaId);
      conta.cliente.contas = conta.cliente.contas.filter(c => c.id !== contaId);
      return true;
    }
    return false;
  }
}
