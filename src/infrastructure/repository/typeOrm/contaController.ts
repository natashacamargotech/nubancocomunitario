import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContaEntity } from './domain/entity/contaEntity.ts';
import { IContaRepository } from 'src/domain/repository/contaRepository.js'; 

export class ContaRepository implements IContaRepository {
  constructor(
    @InjectRepository(ContaEntity)
    private readonly repository: Repository<ContaEntity>,
  ) {}

  async salvar(conta: ContaEntity): Promise<ContaEntity> {
    return await this.repository.save(conta);
  }

  async buscarPorNumero(numero: string): Promise<ContaEntity | null> {
    return (await this.repository.findOne({ where: { numero } })) || null;
  }

  async atualizar(conta: ContaEntity): Promise<ContaEntity> {
    return await this.repository.save(conta);
  }

  async deletar(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async buscarTodos(): Promise<ContaEntity[]> {
    return await this.repository.find();
  }
}