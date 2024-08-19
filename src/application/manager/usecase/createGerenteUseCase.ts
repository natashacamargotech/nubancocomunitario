import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';
import { Repository } from 'typeorm';
import { CreateGerenteDto } from '../dto/createGerentDto';
@Injectable()
export class CreateGerenteUseCase {
  constructor(
    @InjectRepository(GerenteEntity)
    private readonly gerenteRepository: Repository<GerenteEntity>,
  ) {}

  async execute(createGerenteDto: CreateGerenteDto): Promise<GerenteEntity> {
    const { nomeCompleto } = createGerenteDto;

    const gerente = this.gerenteRepository.create({ nomeCompleto });

    return await this.gerenteRepository.save(gerente);
  }
}
