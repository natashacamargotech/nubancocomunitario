import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './repository/typeOrm/clienteController';
import { ContaRepository } from './repository/typeOrm/contaController';
import { GerenteRepository } from './repository/typeOrm/gerenteController'; 
import { ClienteEntity } from './domain/entity/clienteEntity.ts';
import { ContaEntity } from './domain/entity/contaEntity.ts';
import { GerenteEntity } from './domain/entity/contaEntity.ts';
import { ContaCorrente } from 'src/domain/entity/contaCorrente'; 
import { ContaPoupanca } from 'src/domain/entity/contaPoupanca'; 

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity, ContaEntity, GerenteEntity, ContaCorrente, ContaPoupanca])], 
  providers: [
    ClienteRepository,
    ContaRepository,
    GerenteRepository,
  ],
  exports: [
    ClienteRepository,
    ContaRepository,
    GerenteRepository,
    TypeOrmModule,
  ],
})
export class InfrastructureModule {}