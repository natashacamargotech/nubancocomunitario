import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conta } from '../models/conta.model';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class ContaService {
    constructor newConta(@InjectModel(Conta.name) private contaModel: Model<Conta>) {
        const newConta = new this.contaModel({tipo, saldo, cliente});
        return newConta.save();
    }
    async updateTipo(contaId: string, novoTipo: string): Promise<Conta> {
        return this.contaModel.findByIdAndUpdate( coontaId, { tipo:novoTipo}, { new: true});
    }
}