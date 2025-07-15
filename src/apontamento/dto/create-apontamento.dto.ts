import { IsDate, IsNumber, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApontamentoDto {
    @IsNumber()
    id_usuario: number;

    @IsNumber()
    id_cliente: number;

    @IsNumber()
    id_categoria: number;

    @IsOptional()
    @IsNumber()
    id_item_projeto_categoria?: number | null;

    @Type(() => Date)
    @IsDate()
    data: Date;

    @IsNumber()
    horas: number;

    @IsString()
    descricao: string;

    @IsBoolean()
    extra: boolean;

    @IsOptional()
    @IsNumber()
    status_extra?: number | null;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    resposta_extra?: Date | null;

    @IsOptional()
    @IsString()
    observacao_extra?: string | null;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    data_exclusao?: Date | null;
}
