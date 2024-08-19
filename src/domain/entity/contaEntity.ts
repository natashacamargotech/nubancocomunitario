import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ManyToOne,
} from 'typeorm';
import { ClienteEntity } from './clienteEntity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipoConta' } })
export class ContaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.contasAssociadas, {
    cascade: ['insert', 'update'],
  })
  cliente: ClienteEntity;

  @Column()
  agencia: string;

  @Column()
  numero: string;

  @Column('decimal')
  saldo: number;

  @Column()
  tipoConta: string;

  @Column({ nullable: true })
  limite?: number;

  @Column({ nullable: true })
  taxaJuros?: number;
}
