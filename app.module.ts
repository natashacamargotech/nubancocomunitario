import { Module } from '@nestjs/common';
import { ClienteModule } from './clientes/cliente.module';
import { ContaModule } from './contas/conta.module';
import { GerenteModule } from './gerentes/gerente.module';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule],
})
export class AppModule {}