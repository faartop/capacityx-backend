import { IsBoolean, IsDate, IsNumber } from 'class-validator';

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

    @IsDate()
    data_inicio: Date;

    @IsDate()
    data_fim?: Date | null;
}