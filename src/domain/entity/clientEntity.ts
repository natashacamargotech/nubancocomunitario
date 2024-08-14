import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Gerente } from './managerEntity'; 
import { Conta } from './accountEntity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  endereco: string;

  @Column()
  telefone: string;

  @Column('decimal', { precision: 10, scale: 2 })
  renda: number;

  @ManyToOne(() => Gerente, (gerente) => gerente.clientes, { nullable: true })
  gerente: Gerente;

  @OneToMany(() => Conta, (conta) => conta.titular)
  contas: Conta[];
}