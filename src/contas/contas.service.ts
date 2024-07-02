import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Conta } from './interfaces/conta.interface';
import { ClienteService } from '../clientes/cliente.service';
import { CreateContaDto } from './dto/create-conta.dto';

@Injectable()
export class ContaService {
  private readonly contas: Conta[] = [];

  constructor(private readonly clienteService: ClienteService) {}

  create(createContaDto: CreateContaDto): Conta {
    const cliente = this.clienteService.findAll().find(c => c.id === createContaDto.clienteId);
    if (cliente) {
      const conta: Conta = plainToClass(Conta, {
        id: Math.random().toString(36).substring(2),
        cliente,
        saldo: createContaDto.saldoInicial,
        tipo: createContaDto.tipo,
        limiteChequeEspecial: createContaDto.tipo === 'corrente' ? 100 : undefined,
      });
      this.contas.push(conta);
      cliente.contas.push(conta); // Adiciona a conta à lista de contas do cliente
      return conta;
    }
    return null;
  }

  findAll(): Conta[] {
    return this.contas.map(conta => plainToClass(Conta, conta));
  }

  findOne(id: string): Conta {
    const conta = this.contas.find(conta => conta.id === id);
    return plainToClass(Conta, conta);
  }

  remove(id: string): boolean {
    const index = this.contas.findIndex(conta => conta.id === id);
    if (index > -1) {
      const conta = this.contas[index];
      conta.cliente.contas = conta.cliente.contas.filter(c => c.id !== id); // Remove a conta da lista de contas do cliente
      this.contas.splice(index, 1);
      return true;
    }
    return false;
  }
}
