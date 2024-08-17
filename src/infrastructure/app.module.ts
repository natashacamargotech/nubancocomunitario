import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';
import { ContaEntity } from './domain/entity/contaEntity.ts';
import { GerenteEntity } from './domain/entity/gerenteEntity.ts';
import { ApplicationModule } from 'src/application/applicationModule.js';
import { DomainModule } from 'src/domain/domainModule.js'; 
import { InfrastructureModule } from './infrastructureModule.js'; 
import { ClienteModule } from 'src/domain/modules/clienteModule.js'; 
import { ContaModule } from 'src/domain/modules/contaModule.js';
import { GerenteModule } from 'src/domain/modules/gerenteModule.js'; 
import { ContaCorrente } from 'src/domain/entity/contaCorrente.js'; 
import { ContaPoupanca } from 'src/domain/entity/contaPoupanca.js'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'reprogramabank',
      username: 'reprograma8',
      password: 'repro',
      entities: [ClienteEntity, GerenteEntity, ContaEntity, ContaCorrente, ContaPoupanca],
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