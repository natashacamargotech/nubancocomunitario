import { Controller,Post, Body } from '@nestjs/common';
import { ClienteService } from '..services/clienteService';

@Controller('clientes')
export class ClienteController {
    constructor (private readnoly clienteService: clienteService) {}

    @Post()
    async create(@Body() createClienteDto: CreateClienteDto: {nome: string, cpf: string}) {
      return this.clienteService.create(createClienteDto.nome, createClienteDto.cpf);
    }
}
