import { IsNumber, IsBoolean, IsDate, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
    @IsString()
    nome: string;

    @IsString()
    email: string;

    @IsNumber()
    nivel_acesso: number;

    @IsNumber()
    id_contrato_trabalho: number;

    @Type(() => Date)
    @IsDate()
    inicio_vigencia: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fim_vigencia?: Date | null;

    @IsBoolean()
    status: boolean;
}
