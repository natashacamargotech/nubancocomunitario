import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { GerenteService } from 'src/domain/service/managerService';
import { CreateGerenteDto } from 'src/presentation/dtos/createmanagerDto'; 
import { UpdateGerenteDto } from 'src/presentation/dtos/update-gerente.dto';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GerenteService } from 'src/domain/service/managerService'; 
import { CreateGerenteDto } from 'src/presentation/dtos/createmanagerDto';
import { CreateContaDto } from 'src/presentation/dtos/createAccountDto'; 


@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  async create(@Body() createGerenteDto: CreateGerenteDto) {
    try {
      const gerente = await this.gerenteService.create(createGerenteDto);
      return {
        message: 'Gerente criado com sucesso',
        data: gerente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return await this.gerenteService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateGerenteDto: UpdateGerenteDto) {
    try {
      const gerente = await this.gerenteService.update(id, updateGerenteDto);
      return {
        message: 'Gerente atualizado com sucesso',
        data: gerente,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.gerenteService.remove(id);
      return {
        message: 'Gerente removido com sucesso',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  @Put(':gerenteId/clientes/:clienteId')
  async addCliente(@Param('gerenteId') gerenteId: string, @Param('clienteId') clienteId: string) {
    return this.gerenteService.addCliente(gerenteId, clienteId);
  }

  @Delete(':gerenteId/clientes/:clienteId')
  async removeCliente(@Param('gerenteId') gerenteId: string, @Param('clienteId') clienteId: string) {
    return this.gerenteService.removeCliente(gerenteId, clienteId);
  }

  @Put(':gerenteId/contas/:contaId')
  async modifyConta(@Param('gerenteId') gerenteId: string, @Param('contaId') contaId: string, @Body() { tipo }: { tipo: 'corrente' | 'poupanca' }) {
    return this.gerenteService.modifyConta(gerenteId, contaId, tipo);
  }

  @Post(':gerenteId/contas')
  async openConta(@Param('gerenteId') gerenteId: string, @Body() createContaDto: CreateContaDto) {
    return this.gerenteService.openConta(gerenteId, createContaDto);
  }

  @Delete(':gerenteId/contas/:contaId')
  async closeConta(@Param('gerenteId') gerenteId: string, @Param('contaId') contaId: string) {
    return this.gerenteService.closeConta(gerenteId, contaId);

  }
}