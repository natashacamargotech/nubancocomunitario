import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';
import { ClienteModule } from '../clientes/cliente.module';

@Module({
  imports: [ClienteModule],
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService], 
})
export class ContaModule {}