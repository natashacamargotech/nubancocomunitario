import { Controller, Get, Post, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClienteDto } from 'src/presentation/dtos/createClientDto';
import { UpdateClienteDto } from 'src/presentation/dtos/updateClientDto';
import { ClienteService } from '../../../domain/services/cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      const cliente = await this.clienteService.create(createClienteDto);
      return {
        message: 'Cliente criado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.clienteService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.clienteService.update(id, updateClienteDto);
      return {
        message: 'Cliente atualizado com sucesso',
        data: cliente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}