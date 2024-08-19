import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ListGerentesUseCase {
  constructor(
    @InjectRepository(GerenteEntity)
    private readonly gerenteRepository: Repository<GerenteEntity>,
  ) {}

  async execute(): Promise<GerenteEntity[]> {
    return await this.gerenteRepository.find({
      relations: ['clientes'],
    });
  }
}
