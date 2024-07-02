import { Module } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { GerenteController } from './gerente.controller';
import { ClienteModule } from '../clientes/cliente.module';
import { ContaModule } from '../contas/conta.module'; // Importa o ContaModule

@Module({
  imports: [ClienteModule, ContaModule], // Certifique-se de importar o ContaModule
  controllers: [GerenteController],
  providers: [GerenteService],
})
export class GerenteModule {}