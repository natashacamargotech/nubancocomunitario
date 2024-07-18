import { Controller, Post, Body, Param } from '@nestjs/common';
import { GerenteService } from '../services/gerente.service';

@Controller('gerentes')
export class GerenteController {
  constructor(private readonly gerenteService: GerenteService) {}

  @Post()
  create(@Body() createGerenteDto: CreateGerenteDto: { nomeCompleto: string, identificacao: string}) {
    return this.gerenteService.create(id, createGerenteDto.nomeCompleto, createGerenteDto.identificacao);
  }

  @Post(':id/clientes')
  async addCliente(@Param('id') id:string, @Body() addClienteDto: { cllienteId: string}) {
    return this.gerenteService.addCliente(id, addClienteDto.cllienteId);
  }

  @Post(':gerenteId/clientes/:clienteId/contas')
  async openCcount(
    @Param('gerenteId') gerenteId: string,
    @Param('clienteId') clienteId: string,
    @Body() body : {tipo: string, saldo: number}
  ) {
    return this.gerenteService.openAcount(gerenteId, clienteId, body.tipo, body.saldo);
  }

}