import { Module } from '@nestjs/common';
import { ClienteModule } from './clienteModule'; 
import { ContaModule } from './contaModule';
import { GerenteModule } from './gerenteModule';
import { PresentationModule } from 'src/presentation/presentationModule'; 

@Module({
  imports: [ClienteModule, ContaModule, GerenteModule, PresentationModule],
  exports: [ClienteModule, ContaModule, GerenteModule, PresentationModule],
})
export class InfrastructureModule {}