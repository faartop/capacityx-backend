import { IsDate, IsBoolean, IsNumber } from 'class-validator'

export class CreateTecnicoDto {
    @IsNumber()
    id_usuario: number;

    @IsNumber()
    id_categoria: number;

    @IsNumber()
    know_how: number;

    @IsDate()
    inicio_vigencia: Date;

    @IsDate()
    fim_vigencia?: Date | null;

    @IsBoolean()
    status: boolean;
}
