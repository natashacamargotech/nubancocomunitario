import { Entity } from 'typeorm';
import { Column } from 'typeorm';
import { ContaEntity } from './ContaEntity';

@Entity()
export class ContaPoupancaEntity extends ContaEntity {
  @Column('decimal', { nullable: false })
  taxaJuros: number;
}
