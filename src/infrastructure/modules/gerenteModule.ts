import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from 'src/domain/entity/managerEntity'; 
import { GerenteService } from 'src/domain/service/managerService'; 
import { GerenteController } from '../adapters/controllers/gerenteController'; 

@Module({
  imports: [TypeOrmModule.forFeature([Gerente])],
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService],
})
export class GerenteModule {}