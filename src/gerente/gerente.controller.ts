import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { CreateGerenteDto } from './dto/create-gerente.dto';
import { CreateContaDto } from '../contas/dto/create-conta.dto';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  create(@Body() createGerenteDto: CreateGerenteDto) {
    return this.gerenteService.create(createGerenteDto);
  }

  @Get()
  findAll() {
    return this.gerenteService.findAll();
  }

  @Put(':gerenteId/clientes/:clienteId')
  addCliente(@Param('gerenteId') gerenteId: string, @Param('clienteId') clienteId: string) {
    return this.gerenteService.addCliente(gerenteId, clienteId);
  }

  @Delete(':gerenteId/clientes/:clienteId')
  removeCliente(@Param('gerenteId') gerenteId: string, @Param('clienteId') clienteId: string) {
    return this.gerenteService.removeCliente(gerenteId, clienteId);
  }

  @Put(':gerenteId/contas/:contaId')
  modifyConta(@Param('gerenteId') gerenteId: string, @Param('contaId') contaId: string, @Body() { tipo }: { tipo: 'corrente' | 'poupanca' }) {
    return this.gerenteService.modifyConta(gerenteId, contaId, tipo);
  }

  @Post(':gerenteId/contas')
  openConta(@Param('gerenteId') gerenteId: string, @Body() createContaDto: CreateContaDto) {
    return this.gerenteService.openConta(gerenteId, createContaDto);
  }

  @Delete(':gerenteId/contas/:contaId')
  closeConta(@Param('gerenteId') gerenteId: string, @Param('contaId') contaId: string) {
    return this.gerenteService.closeConta(gerenteId, contaId);
  }
}