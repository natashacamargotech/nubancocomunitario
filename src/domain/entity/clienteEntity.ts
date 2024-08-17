import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ContaEntity } from './domain/entity/contaEntity.ts';
import { GerenteService } from './domain/service/gerenteService.ts';

@Entity()
export class Cliente {
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

  @OneToMany(() => ContaEntity, ContaEntity => ContaEntity.cliente { 
    cascade: []  
  })
  contasAssociadas: ContaEntity[];

  @ManyToOne(() => GerenteService, (GerenteService) => GerenteService.cliente)
  GerenteService: GerenteService;
  

  @Column('decimal')
  rendaSalarial: number;
}