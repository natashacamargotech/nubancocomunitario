import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { GerenteService } from '../service/gerenteService';
import { ContaEntity } from './ContaEntity';

@Entity()
export class ClienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeCompleto: string;

  @Column('json')
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    estado: string;
  };

  @Column()
  telefone: string;

  @OneToMany(() => ContaEntity, (conta) => conta.cliente, {
    cascade: [],
  })
  contasAssociadas: ContaEntity[];

  @ManyToOne(() => GerenteService, (gerente) => gerente.encontrarGerentePorId)
  gerenteService: GerenteService;

  @Column('decimal')
  rendaSalarial: number;
}
