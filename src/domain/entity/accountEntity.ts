import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from './clientEntity';
import { Transacao } from './transacaoEntity';

@Entity()
export class Conta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numeroConta: string;

  @Column()
  agencia: string;

  @Column()
  tipo: 'corrente' | 'poupanca';

  @Column('decimal', { precision: 10, scale: 2 })
  saldo: number;

  @Column({ type: 'timestamp' })
  dataAbertura: Date;

  @Column()
  status: 'ativa' | 'inativa' | 'suspensa';

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  limiteCredito: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.contas)
  titular: Cliente;

  @OneToMany(() => Transacao, (transacao) => transacao.conta)
  transacoes: Transacao[];
}