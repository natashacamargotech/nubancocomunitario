import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from 'src/application/client/dto/creatClienteDto.js';
import { UpdateClienteDto } from 'src/application/client/dto/updateClienteDto.js';
import { CreateClienteUseCase } from 'src/application/client/usecase/createClienteUseCase';
import { UpdateClienteUseCase } from 'src/application/client/usecase/updateClienteUseCase';
import { ListClientesUseCase } from 'src/application/client/usecase/listClienteUseCase';
import { ListClienteByIdUseCase } from 'src/application/client/usecase/listIdClienteUseCase';
import { DeleteClienteUseCase } from 'src/application/client/usecase/deletClienteUseCase';
import { Injectable } from '@nestjs/common';
import { ClienteEntity } from '../entity/clienteEntity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
    private readonly createClienteUseCase: CreateClienteUseCase,
    private readonly updateClienteUseCase: UpdateClienteUseCase,
    private readonly deleteClienteUseCase: DeleteClienteUseCase,
    private readonly listClientesUseCase: ListClientesUseCase,
    private readonly listByIdClienteUseCase: ListClienteByIdUseCase,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    return await this.createClienteUseCase.execute(createClienteDto);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    return await this.updateClienteUseCase.execute(id, updateClienteDto);
  }

  async delete(id: string) {
    return await this.deleteClienteUseCase.execute(id);
  }

  async listAll() {
    return await this.listClientesUseCase.execute();
  }

  async listById(id: string) {
    return await this.listByIdClienteUseCase.execute(id);
  }
}
