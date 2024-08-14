import { Module } from '@nestjs/common';
import { ClienteController } from 'src/infrastructure/adapters/controllers/clienteController'; 
import { ContaController } from 'src/infrastructure/adapters/controllers/contaController';
import { GerenteController } from 'src/infrastructure/adapters/controllers/gerenteController'; 
import { ClienteModule } from 'src/infrastructure/modules/clienteModule'; 
import { ContaModule } from 'src/infrastructure/modules/contaModule';
import { GerenteModule } from 'src/infrastructure/modules/gerenteModule';

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule],
  controllers: [ClienteController, ContaController, GerenteController],
})
export class PresentationModule {}