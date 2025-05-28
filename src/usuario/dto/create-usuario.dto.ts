import { IsNumber, IsBoolean, IsDate, IsString } from 'class-validator'

export class CreateUsuarioDto {
    @IsString()
    nome: string;

    @IsString()
    email: string;

    @IsNumber()
    nivel_acesso: number;

    @IsNumber()
    id_contrato_trabalho: number;

    @IsDate()
    inicio_vigencia: Date;

    @IsDate()
    fim_vigencia?: Date | null;

    @IsBoolean()
    status: boolean;
}
