import { IsDate, IsString, IsNumber } from 'class-validator'

export class CreateCategoriaDto {
    @IsString()
    descricao: string;

    @IsDate()
    inicio_vigencia: Date;

    @IsDate()
    fim_vigencia?: Date | null;

    @IsNumber()
    id_categoria_pai: number;

    @IsNumber()
    id_responsavel: number;
}
