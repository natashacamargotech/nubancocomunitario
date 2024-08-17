import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './service/clienteService';
import { ContaService } from './service/contaService'; 
import { GerenteService } from './service/gerenteService'; 
import { ClienteEntity } from './domain/entity/clienteEntity.ts';
import { ContaEntity } from './domain/entity/contaEntity.ts';
import { GerenteEntity } from './domain/entity/gerenteEntity.ts';
import { ClienteModule } from './modules/clienteModule';
import { InfrastructureModule } from 'src/infrastructure/infrastructureModule';
import { ContaModule } from './modules/contaModule'; 
import { GerenteModule } from './modules/gerenteModule'; 

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([ClienteEntity, ContaEntity, GerenteEntity]),
    ClienteModule,
    ContaModule,
    GerenteModule,
  ],
  providers: [ClienteService, ContaService, GerenteService],
  exports: [ClienteService, ContaService, GerenteService],
})
export class DomainModule {}