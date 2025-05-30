import { IsDate, IsBoolean, IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer';


export class CreateTecnicoDto {
    @IsNumber()
    id_usuario: number;

    @IsNumber()
    id_categoria: number;

    @IsNumber()
    know_how: number;

    @Type(() => Date)
    @IsDate()
    inicio_vigencia: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fim_vigencia?: Date | null;

    @IsBoolean()
    status: boolean;
}
