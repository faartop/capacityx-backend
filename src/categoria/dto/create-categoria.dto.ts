import { IsDate, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoriaDto {
    @IsString()
    descricao: string;

    @Type(() => Date)
    @IsDate()
    inicio_vigencia: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fim_vigencia?: Date | null;

    @IsNumber()
    id_categoria_pai: number;

    @IsNumber()
    id_responsavel: number;
}
