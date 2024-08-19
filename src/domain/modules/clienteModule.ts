import { Module } from '@nestjs/common';
import { CreateClienteUseCase } from 'src/application/client/usecase/createClienteUseCase';
import { UpdateClienteUseCase } from 'src/application/client/usecase/updateClienteUseCase';
import { DeleteClienteUseCase } from 'src/application/client/usecase/deletClienteUseCase';
import { ListClientesUseCase } from 'src/application/client/usecase/listClienteUseCase';
import { ListClienteByIdUseCase } from 'src/application/client/usecase/listIdClienteUseCase';
import { ClienteService } from '../service/clienteService';
import { InfrastructureModule } from 'src/infrastructure/infrastructureModule';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ClienteService,
    CreateClienteUseCase,
    UpdateClienteUseCase,
    DeleteClienteUseCase,
    ListClientesUseCase,
    ListClienteByIdUseCase,
  ],
  exports: [
    CreateClienteUseCase,
    UpdateClienteUseCase,
    DeleteClienteUseCase,
    ListClientesUseCase,
    ListClienteByIdUseCase,
  ],
})
export class ClienteModule {}
