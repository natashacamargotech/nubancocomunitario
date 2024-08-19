import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ListByIdGerenteUseCase {
  constructor(
    @InjectRepository(GerenteEntity)
    private readonly gerenteRepository: Repository<GerenteEntity>,
  ) {}

  async execute(idGerente: string): Promise<GerenteEntity> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente },
      relations: ['clientes'],
    });

    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${idGerente} não encontrado.`,
      );
    }

    return gerente;
  }
}
