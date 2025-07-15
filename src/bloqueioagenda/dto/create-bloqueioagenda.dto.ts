import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBloqueioAgendaDto {
    @IsNumber()
    id_usuario: number;

    @IsString()
    motivo: string;

    @Type(() => Date)
    @IsDate()
    data_inicio: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    data_fim?: Date | null;

    @IsOptional()
    @IsNumber()
    hora_inicio?: number | null;

    @IsOptional()
    @IsNumber()
    hora_fim?: number | null;

    @IsNumber()
    aprovacao: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    data_exclusao?: Date | null;
}
