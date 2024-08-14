import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Gerente } from '../entity/managerEntity'; 
import { Conta } from '../entity/accountEntity'; 
import { ClienteService } from './cliente.service';
import { ContaService } from './conta.service';
import { CreateGerenteDto } from 'src/presentation/dtos/createmanagerDto';
import { CreateContaDto } from 'src/presentation/dtos/createAccountDto'; 

@Injectable()
export class GerenteService {

  constructor(
    @InjectRepository(Gerente)
    private gerenteRepository: Repository<Gerente>, // Certifique-se de que a injeção está correta
  ) {}

  async create(createGerenteDto: CreateGerenteDto): Promise<Gerente> {
    const gerente = this.gerenteRepository.create(createGerenteDto);
    return await this.gerenteRepository.save(gerente);

  private readonly gerentes: Gerente[] = [];
  private readonly logger = new Logger(GerenteService.name);

  constructor(
    private readonly clienteService: ClienteService,
    private readonly contaService: ContaService,
  ) {}

  create(createGerenteDto: CreateGerenteDto): Gerente {
    const gerente: Gerente = plainToClass(Gerente, {
      id: this.generateUniqueId(),
      nome: createGerenteDto.nome,
      clientes: [],
    });
    this.gerentes.push(gerente);
    return gerente;

  }

  async findAll(): Promise<Gerente[]> {
    return await this.gerenteRepository.find({ relations: ['clientes'] });
  }


  async update(id: string, updateGerenteDto: UpdateGerenteDto): Promise<Gerente> {
    await this.gerenteRepository.update(id, updateGerenteDto);
    const gerente = await this.gerenteRepository.findOne({ where: { id } });

  addCliente(gerenteId: string, clienteId: string): Gerente {
    const gerente = this.findGerenteById(gerenteId);
    const cliente = this.clienteService.findAll().find((c) => c.id === clienteId);

    if (gerente && cliente) {
      gerente.clientes.push(cliente);
      cliente.gerente = gerente;
    }
    return plainToClass(Gerente, gerente);
  }

  removeCliente(gerenteId: string, clienteId: string): { success: boolean; message: string } {
    const gerente = this.findGerenteById(gerenteId);
    const cliente = this.clienteService.findAll().find((c) => c.id === clienteId);

    if (gerente && cliente) {
      gerente.clientes = gerente.clientes.filter((c) => c.id !== clienteId);
      cliente.gerente = null;
      const removed = this.clienteService.remove(clienteId);
      return {
        success: removed,
        message: removed ? 'Cliente removido com sucesso' : 'Falha ao remover o cliente',
      };
    }
    return { success: false, message: 'Gerente ou cliente não encontrado' };
  }

  modifyConta(gerenteId: string, contaId: string, tipo: 'corrente' | 'poupanca'): Conta {
    const gerente = this.findGerenteById(gerenteId);
    const conta = this.contaService.findAll().find((c) => c.id === contaId);

    if (gerente && conta) {
      conta.tipo = tipo;
      conta.limiteChequeEspecial = tipo === 'corrente' ? 100 : undefined;
    }
    return plainToClass(Conta, conta);
  }

  openConta(gerenteId: string, createContaDto: CreateContaDto): Conta {
    const gerente = this.findGerenteById(gerenteId);
    const cliente = this.clienteService.findAll().find((c) => c.id === createContaDto.clienteId);

    if (gerente && cliente) {
      const conta = this.contaService.create(createContaDto);
      cliente.contas.push(conta);
      return plainToClass(Conta, conta);
    }
    return null;
  }

  closeConta(gerenteId: string, contaId: string): boolean {
    const gerente = this.findGerenteById(gerenteId);
    const conta = this.contaService.findAll().find((c) => c.id === contaId);

    if (gerente && conta) {
      this.contaService.remove(contaId);
      conta.cliente.contas = conta.cliente.contas.filter((c) => c.id !== contaId);
      return true;
    }
    return false;
  }

  private findGerenteById(id: string): Gerente {
    const gerente = this.gerentes.find((g) => g.id === id);

    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado`);
    }
    return gerente;
  }

  async remove(id: string): Promise<void> {
    await this.gerenteRepository.delete(id);
  }
}