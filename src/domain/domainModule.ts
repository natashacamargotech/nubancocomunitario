import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './service/clienteService';
import { ContaService } from './service/contaService';
import { GerenteService } from './service/gerenteService';
import { ClienteModule } from './modules/clienteModule';
import { InfrastructureModule } from 'src/infrastructure/infrastructureModule';
import { ContaModule } from './modules/contaModule';
import { GerenteModule } from './modules/gerenteModule';
import { ClienteEntity } from './entity/clienteEntity';
import { ContaEntity } from './entity/ContaEntity';
import { GerenteEntity } from './entity/gerenteEntity';

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
