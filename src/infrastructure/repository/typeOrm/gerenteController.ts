import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IGerenteRepository } from 'src/domain/repository/gerenteRepository';
import { GerenteEntity } from 'src/domain/entity/gerenteEntity';

@Injectable()
export class GerenteRepository implements IGerenteRepository {
  constructor(
    @InjectRepository(GerenteEntity)
    private readonly gerenteRepository: Repository<GerenteEntity>,
  ) {}

  async findById(id: string): Promise<GerenteEntity | null> {
    return this.gerenteRepository.findOne({
      where: { id: id } as any,
    });
  }

  async findAll(): Promise<GerenteEntity[]> {
    return this.gerenteRepository.find();
  }

  async save(gerente: GerenteEntity): Promise<GerenteEntity> {
    return this.gerenteRepository.save(gerente);
  }

  async delete(id: string): Promise<void> {
    await this.gerenteRepository.delete(id);
  }
}
