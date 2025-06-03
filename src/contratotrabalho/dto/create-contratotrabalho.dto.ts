import { IsDate, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator'
import { Type } from 'class-transformer';

export class CreateContratoTrabalhoDto {
    @IsString()
    nivel_tecnico: string;

    @IsNumber()
    carga_horaria: number;

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
