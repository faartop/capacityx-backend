import { IsBoolean, IsDate, IsString, IsNumber } from 'class-validator'

export class CreateClienteDto {
    @IsNumber()
    id_usuario: number;
    
    @IsString()
    nome: string;
    
    @IsBoolean()
    status: boolean
    
    @IsDate()
    inicio_vigencia: Date;
    
    @IsDate()
    fim_vigencia?: Date | null;
}
