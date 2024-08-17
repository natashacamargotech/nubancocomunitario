import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClienteEntity } from './domain/entity/clienteEntity.ts';

@Entity()
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  idGerente: string;

  @Column()
  nomeCompleto: string;

  @OneToMany(() => ClienteEntity, (ClienteEntity) => ClienteEntity.gerente)
  ClienteEntity: ClienteEntity[];

  constructor(nomeCompleto: string) {
    this.nomeCompleto = nomeCompleto;
  }
}