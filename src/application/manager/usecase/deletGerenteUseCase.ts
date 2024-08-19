import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteGerenteUseCase {
  constructor(
    @InjectRepository(GerenteEntity)
    private readonly gerenteRepository: Repository<GerenteEntity>,
  ) {}

  async execute(gerenteId: string): Promise<void> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente: gerenteId },
    });
    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${gerenteId} não encontrado.`,
      );
    }

    await this.gerenteRepository.remove(gerente);
  }
}
