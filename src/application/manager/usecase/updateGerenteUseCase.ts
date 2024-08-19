import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';
import { Repository } from 'typeorm';
import { UpdateGerenteDto } from '../dto/updateGerenteDto';

@Injectable()
export class UpdateGerenteUseCase {
  constructor(
    @InjectRepository(GerenteEntity)
    private readonly gerenteRepository: Repository<GerenteEntity>,
  ) {}

  async execute(
    idGerente: string,
    updateGerenteDto: UpdateGerenteDto,
  ): Promise<GerenteEntity> {
    const gerente = await this.gerenteRepository.findOne({
      where: { idGerente },
      relations: ['clientes'],
    });

    if (!gerente) {
      throw new NotFoundException(
        `Gerente com ID ${idGerente} não encontrado.`,
      );
    }

    const updatedGerente = this.gerenteRepository.merge(
      gerente,
      updateGerenteDto,
    );

    return await this.gerenteRepository.save(updatedGerente);
  }
}
