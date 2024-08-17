import { Entity } from 'typeorm';
import { ContaEntity } from './domain/service/contaEntity.ts';
import { Column } from 'typeorm';

@Entity()
export class ContaPoupanca extends ContaEntity {
  @Column('decimal', { nullable: false })
  taxaJuros: number;
}