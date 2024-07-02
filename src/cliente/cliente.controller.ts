import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('cliente')
export class ClienteController {
    constructor (private readnoly clienteService: clienteService) {}
    @Post()
    create(@Body() createClienteDto: CreateClienteDto) {
      return this.clienteService.create(createClienteDto);
    }
  
    @Get()
    findAll() {
      return this.clienteService.findAll();
    }
}
