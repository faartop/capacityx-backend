import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAlocacaoDto {
    @IsNumber()
    id_tecnico: number;

    @Type(() => Date)
    @IsDate()
    competencia: Date;

    @IsOptional()
    @IsNumber()
    id_contrato?: number | null;

    @IsOptional()
    @IsNumber()
    id_item_projeto_categoria?: number | null;

    @IsNumber()
    qtd_hrs_alocadas: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    data_exclusao?: Date | null;
}
