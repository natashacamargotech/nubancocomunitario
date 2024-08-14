import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/domain/entity/clientEntity'; 
import { ClienteService } from '../../domain/services/cliente.service';
import { ClienteController } from '../adapters/controllers/clienteController'; 

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [TypeOrmModule],
})
export class ClienteModule {}