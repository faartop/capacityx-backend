import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClienteDto {
    @IsString()
    nome: string;
    
    @IsBoolean()
    status: boolean

    @Type(() => Date)
    @IsDate()
    inicio_vigencia: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fim_vigencia?: Date | null;
}
