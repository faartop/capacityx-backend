import { IsBoolean, IsDate, IsString } from 'class-validator'

export class CreateClienteDto {
    @IsString()
    nome: string;
    
    @IsBoolean()
    status: boolean
    
    @IsDate()
    inicio_vigencia: Date;
    
    @IsDate()
    fim_vigencia?: Date | null;
}
