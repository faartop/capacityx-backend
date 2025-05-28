import { IsDate, IsString, IsNumber } from 'class-validator'

export class CreateItemProjetoCategoriaDto {
    @IsString()
    descricao: string;
    
    @IsNumber()
    qtd_horas: number;
    
    @IsNumber()
    id_projeto_categoria: number;
    
    @IsDate()
    data_exclusao?: Date | null;
}
