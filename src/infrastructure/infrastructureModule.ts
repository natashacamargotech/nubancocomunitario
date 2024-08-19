import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './repository/typeOrm/clienteController';
import { ContaRepository } from './repository/typeOrm/contaController';
import { GerenteRepository } from './repository/typeOrm/gerenteController';
import { ClienteEntity } from 'src/domain/entity/clienteEntity';
import { ContaEntity } from 'src/domain/entity/ContaEntity';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';
import { ContaCorrenteEntity } from 'src/domain/entity/contaCorrenteEntity';
import { ContaPoupancaEntity } from 'src/domain/entity/contaPoupancaEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClienteEntity,
      ContaEntity,
      GerenteEntity,
      ContaCorrenteEntity,
      ContaPoupancaEntity,
    ]),
  ],
  providers: [ClienteRepository, ContaRepository, GerenteRepository],
  exports: [
    ClienteRepository,
    ContaRepository,
    GerenteRepository,
    TypeOrmModule,
  ],
})
export class InfrastructureModule {}
