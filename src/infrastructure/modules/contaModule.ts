import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from 'src/domain/entity/accountEntity'; 
import { Transacao } from 'src/domain/entity/transacaoEntity'; 
import { ContaService } from 'src/domain/service/accountService'; 
import { TransacaoService } from 'src/domain/service/transacaoService'; 
import { ContaController } from '../adapters/controllers/contaController';
import { ClienteModule } from './clienteModule'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Conta, Transacao]),
    ClienteModule, 
  ],
  controllers: [ContaController],
  providers: [ContaService, TransacaoService],
  exports: [ContaService, TransacaoService],
})
export class ContaModule {}