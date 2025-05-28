import { IsDate, IsString } from 'class-validator'

export class CreateCategoriaPaiDto {
    @IsString()
    descricao: string;

    @IsDate()
    inicio_vigencia: Date;

    @IsDate()
    fim_vigencia?: Date | null;
}
