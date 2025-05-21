import { IsBoolean, IsDate, IsString, IsNumber } from 'class-validator'

export class CreateContratoDto {
    @IsNumber()
    carga_horaria: number;
    
    @IsNumber()
    id_tecnologia: number;
    
    @IsNumber()
    id_cliente: number;
    
    @IsBoolean()
    presencial: boolean;
    
    @IsString()
    area_responsavel: string;
    
    @IsNumber()
    id_prioridade: number;
    
    @IsNumber()
    id_atendimento: number;
    
    @IsNumber()
    id_usuario: number;
    
    @IsNumber()
    id_tipo_contrato: number;
    
    @IsDate()
    inicio_vigencia: Date;
    
    @IsDate()
    fim_vigencia: Date;
}
