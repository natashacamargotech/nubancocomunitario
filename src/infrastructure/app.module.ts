import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from 'src/application/applicationModule.js';
import { DomainModule } from 'src/domain/domainModule.js';
import { InfrastructureModule } from './infrastructureModule.js';
import { ClienteModule } from 'src/domain/modules/clienteModule.js';
import { ContaModule } from 'src/domain/modules/contaModule.js';
import { GerenteModule } from 'src/domain/modules/gerenteModule.js';
import { ClienteEntity } from 'src/domain/entity/clienteEntity.js';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity.js';
import { ContaEntity } from 'src/domain/entity/ContaEntity.js';
import { ContaCorrenteEntity } from 'src/domain/entity/contaCorrenteEntity.js';
import { ContaPoupancaEntity } from 'src/domain/entity/contaPoupancaEntity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'reprogramabank',
      username: 'reprograma8',
      password: 'repro',
      entities: [
        ClienteEntity,
        GerenteEntity,
        ContaEntity,
        ContaCorrenteEntity,
        ContaPoupancaEntity,
      ],
      synchronize: true,
    }),
    ApplicationModule,
    DomainModule,
    InfrastructureModule,
    ClienteModule,
    ContaModule,
    GerenteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
