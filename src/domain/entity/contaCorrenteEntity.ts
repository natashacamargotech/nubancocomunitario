import { Entity } from 'typeorm';
import { Column } from 'typeorm';
import { ContaEntity } from './ContaEntity';

@Entity()
export class ContaCorrenteEntity extends ContaEntity {
  @Column('decimal', { nullable: false })
  limiteChequeEspecial: number;
}
