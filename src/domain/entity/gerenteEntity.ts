import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClienteEntity } from './clienteEntity';

@Entity()
export class GerenteEntity {
  @PrimaryGeneratedColumn('uuid')
  idGerente: string;

  @Column()
  nomeCompleto: string;

  @OneToMany(() => ClienteEntity, (cliente) => cliente.gerenteService)
  clientes: ClienteEntity[];

  constructor(nomeCompleto: string) {
    this.nomeCompleto = nomeCompleto;
  }
}
