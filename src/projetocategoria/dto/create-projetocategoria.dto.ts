import { IsDate, IsNumber } from 'class-validator'

export class CreateProjetoCategoriaDto {
    @IsNumber()
    qtd_horas: number;
    
    @IsNumber()
    id_categoria: number;
    
    @IsNumber()
    id_projeto: number;
    
    @IsDate()
    data_exclusao: Date | null;
}
