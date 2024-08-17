import { Entity } from 'typeorm';
import { ContaEntity } from './domain/entity/contaEntity.ts';
import { Column } from 'typeorm';

@Entity()
export class ContaCorrente extends ContaEntity {
  @Column('decimal', { nullable: false })
  limiteChequeEspecial: number;
}