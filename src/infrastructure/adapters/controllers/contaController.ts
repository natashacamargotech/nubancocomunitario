import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ContaService } from 'src/domain/service/accountService'; 
import { TransacaoService } from 'src/domain/service/transacaoService';
import { CreateContaDto } from 'src/presentation/dtos/createAccountDto';


@Controller('contas')
export class ContaController {
  constructor(
    private readonly contaService: ContaService,
    private readonly transacaoService: TransacaoService,
  ) {}

  @Post()
  async create(@Body() createContaDto: CreateContaDto) {
    try {
      const conta = await this.contaService.create(createContaDto);
      return {
        message: 'Conta criada com sucesso',
        data: conta,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.contaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const conta = await this.contaService.findOne(id);
      return conta;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':id/depositar')
  async depositar(@Param('id') contaId: string, @Body('valor') valor: number) {
    try {
      const transacao = await this.transacaoService.depositar(contaId, valor);
      return {
        message: 'Depósito realizado com sucesso',
        data: transacao,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/sacar')
  async sacar(@Param('id') contaId: string, @Body('valor') valor: number) {
    try {
      const transacao = await this.transacaoService.sacar(contaId, valor);
      return {
        message: 'Saque realizado com sucesso',
        data: transacao,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/transferir')
  async transferir(
    @Param('id') contaOrigemId: string,
    @Body('contaDestinoId') contaDestinoId: string,
    @Body('valor') valor: number,
  ) {
    try {
      const transacao = await this.transacaoService.transferir(contaOrigemId, contaDestinoId, valor);
      return {
        message: 'Transferência realizada com sucesso',
        data: transacao,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/extrato')
  async extrato(@Param('id') contaId: string) {
    try {
      const extrato = await this.transacaoService.getExtrato(contaId);
      return {
        message: 'Extrato obtido com sucesso',
        data: extrato,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


}