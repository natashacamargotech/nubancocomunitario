import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Cliente } from './interfaces/cliente.interface';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  private readonly clientes: Cliente[] = [];

  create(createClienteDto: CreateClienteDto): Cliente {
    const cliente: Cliente = plainToClass(Cliente, {
      id: Math.random().toString(36).substring(2),
      ...createClienteDto,
      contas: [],
      gerente: null,
    });
    this.clientes.push(cliente);
    return cliente;
  }

  findAll(): Cliente[] {
    return this.clientes.map(cliente => plainToClass(Cliente, cliente));
  }

  remove(id: string): boolean {
    const index = this.clientes.findIndex(cliente => cliente.id === id);
    if (index > -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }
}