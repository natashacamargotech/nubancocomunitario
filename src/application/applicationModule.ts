import { Module } from '@nestjs/common';
import { ClienteController } from './client/controller/clienteController'; 
import { ContaController } from './account/controller/contaController'; 
import { GerenteController } from './manager/controller/gerenteController'; 
import { DomainModule } from 'src/domain/domainModule';
import { CreateContaUseCase } from './account/usecase/createContaUseCase'; 
import { UpdateClienteUseCase } from './client/usecase/updateClienteUseCase';
import { DeleteContaUseCase } from './account/usecase/deletContaUseCase'; 
import { ListContasUseCase } from './account/usecase/listIdContaUseCase'; 
import { ListByIdContaUseCase } from './account/usecase/listContaUseCase';
import { DepositUseCase } from './account/usecase/depositContaUseCase';
import { WithdrawUseCase } from './account/usecase/withdrawUsecase'; 
import { TransferUseCase } from './account/usecase/TransferUseCase'; 
import { PaymentPixUseCase } from './account/usecase/paymentPixUseCase'; 
import { PaymentBoletoUseCase } from './account/usecase/paymentBoletoUseCase';
import { InfrastructureModule } from 'src/infrastructure/infrastructureModule'; 

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: [
    CreateContaUseCase,
    UpdateClienteUseCase,
    DeleteContaUseCase,
    ListContasUseCase,
    ListByIdContaUseCase,
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    PaymentPixUseCase,
    PaymentBoletoUseCase,
  ],
  controllers: [ClienteController, ContaController, GerenteController],
  exports: [
    CreateContaUseCase,
    UpdateClienteUseCase,
    DeleteContaUseCase,
    ListContasUseCase,
    ListByIdContaUseCase,
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    PaymentPixUseCase,
    PaymentBoletoUseCase,
  ],
})

export class ApplicationModule {}