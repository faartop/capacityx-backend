import { IsNumber, IsDate } from 'class-validator'

export class CreateAlocacaoDto {
    @IsNumber()
    id_tecnico: number;

    @IsDate()
    competencia: Date;

    @IsNumber()
    id_contrato: number | null;

    @IsNumber()
    id_item_projeto_categoria?: number | null;

    @IsNumber()
    qtd_hrs_alocadas: number;

    @IsNumber()
    qtd_hrs_comerciais: number;

    @IsDate()
    data_exclusao?: Date | null;
}
