import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateGerenteDto {

  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  nome: string;

  @IsEmail()
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  senha: string;
}

    nome: string;
  }