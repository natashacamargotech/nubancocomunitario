import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cliente } from './clientEntity';

@Entity()
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;


  @Column()
  email: string;

  @Column()
  senha: string;

  @OneToMany(() => Cliente, (cliente) => cliente.gerente)

  @Type(() => Cliente)

  clientes: Cliente[];
}