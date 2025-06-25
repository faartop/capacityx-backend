import { IsDate, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContratoDto {
    @IsNumber()
    carga_horaria: number;

    @IsNumber()
    id_categoria: number;

    @IsNumber()
    id_cliente: number;

    @IsBoolean()
    presencial: boolean;

    @IsNumber()
    id_prioridade: number;

    @IsNumber()
    id_atendimento: number;

    @IsNumber()
    id_tipo_contrato: number;

    @Type(() => Date)
    @IsDate()
    data_inicio: Date;

    @Type(() => Date)
    @IsDate()
    data_fim: Date;
}
