import { Module } from '@nestjs/common';

import { CreateContaUseCase } from 'src/application/account/usecase/createContaUseCase';
import { UpdateContaUseCase } from 'src/application/account/usecase/updateContaUseCase';
import { DeleteContaUseCase } from 'src/application/account/usecase/deletContaUseCase';
import { ListContasUseCase } from 'src/application/account/usecase/listIdContaUseCase';
import { ListByIdContaUseCase } from 'src/application/account/usecase/listContaUseCase';
import { DepositUseCase } from 'src/application/account/usecase/depositContaUseCase';
import { WithdrawUseCase } from 'src/application/account/usecase/withdrawUsecase';
import { TransferUseCase } from 'src/application/account/usecase/TransferUseCase';
import { PaymentPixUseCase } from 'src/application/account/usecase/paymentPixUseCase';
import { PaymentBoletoUseCase } from 'src/application/account/usecase/paymentBoletoUseCase';
import { ContaService } from '../service/contaService';
import { InfrastructureModule } from 'src/infrastructure/infrastructureModule';

@Module({
  imports: [InfrastructureModule],
  providers: [
    ContaService,
    CreateContaUseCase,
    UpdateContaUseCase,
    DeleteContaUseCase,
    ListContasUseCase,
    ListByIdContaUseCase,
    DepositUseCase,
    WithdrawUseCase,
    TransferUseCase,
    PaymentPixUseCase,
    PaymentBoletoUseCase,
  ],
  exports: [
    ContaService,
    CreateContaUseCase,
    UpdateContaUseCase,
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
export class ContaModule {}
