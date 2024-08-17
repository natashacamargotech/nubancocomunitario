import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts'; 

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'tipoConta' } })
export class Conta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClienteEntity, ClienteEntity => ClienteEntity.contaAssociada { 
    cascade: ['insert', 'update'] 
  })
  ClienteEntity: ClienteEntity;


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