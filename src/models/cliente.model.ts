import { Prop, Schema, ShemaFactory} from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema()
export class Cliente extends Document {
    @Prop({ required: true})
    nome: string;

    @Prop({ required: true})
    cpf: string;

    @Prop()
    contas: string[];
}

export ClienteSchema = SchemaFactory.createForClass(Cliente);