import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './clienteModule.js';
import { ContaModule } from './contaModule.js';
import { GerenteService } from '../service/gerenteService';
import { GerenteRepository } from 'src/infrastructure/repository/typeOrm/gerenteController';
import { CreateGerenteUseCase } from 'src/application/manager/usecase/createGerenteUseCase';
import { UpdateGerenteUseCase } from 'src/application/manager/usecase/updateGerenteUseCase';
import { DeleteGerenteUseCase } from 'src/application/manager/usecase/deletGerenteUseCase';
import { ListByIdGerenteUseCase } from 'src/application/manager/usecase/listIdGerenterUseCase';
import { ListGerentesUseCase } from 'src/application/manager/usecase/listGerenteUseCase';
import { AddClienteToGerenteUseCase } from 'src/application/manager/usecase/addClienteByGerenteUseCase';
import { RemoveClienteFromGerenteUseCase } from 'src/application/manager/usecase/removerClientfromGerenteUseCase';
import { CreateContaUseCase } from 'src/application/account/usecase/createContaUseCase.js';
import { DeleteContaUseCase } from 'src/application/account/usecase/deletContaUseCase.js';
import { ListClienteByIdUseCase } from 'src/application/client/usecase/listIdClienteUseCase.js';
import { ContaService } from '../service/contaService.js';
import { InfrastructureModule } from 'src/infrastructure/infrastructureModule.js';
import { GerenteEntity } from '../entity/gerenteEntity.js';
@Module({
  imports: [
    TypeOrmModule.forFeature([GerenteEntity]),
    ClienteModule,
    ContaModule,
    InfrastructureModule,
  ],
  providers: [
    GerenteRepository,
    GerenteService,
    CreateGerenteUseCase,
    UpdateGerenteUseCase,
    DeleteGerenteUseCase,
    ListGerentesUseCase,
    ListByIdGerenteUseCase,
    AddClienteToGerenteUseCase,
    RemoveClienteFromGerenteUseCase,
    CreateContaUseCase,
    DeleteContaUseCase,
    ListClienteByIdUseCase,
    ContaService,
  ],
  exports: [
    GerenteService,
    CreateGerenteUseCase,
    UpdateGerenteUseCase,
    DeleteGerenteUseCase,
    ListGerentesUseCase,
    ListByIdGerenteUseCase,
    AddClienteToGerenteUseCase,
    RemoveClienteFromGerenteUseCase,
    CreateContaUseCase,
    DeleteContaUseCase,
    ListClienteByIdUseCase,
    ContaService,
  ],
})
export class GerenteModule {}
