import { IsBoolean, IsDate, IsString, IsNumber } from 'class-validator'

export class CreateProjetoDto {
    @IsNumber()
    id_cliente: number;
    
    @IsString()
    nome: string;
    
    @IsDate()
    data_inicio: Date;
    
    @IsDate()
    data_fim: Date;
    
    @IsDate()
    data_alinhamento: Date;
    
    @IsDate()
    data_entrega: Date;
    
    @IsDate()
    data_parada: Date;
    
    @IsDate()
    data_cancelamento: Date;
    
    @IsNumber()
    dias_garantia: number;
    
    @IsNumber()
    quantidade_horas: number;
    
    @IsString()
    areas_envolvidas: string;
    
    @IsDate()
    envio_financeira: Date;
    
    @IsNumber()
    valor_proposta: number;
    
    @IsBoolean()
    status: boolean;
    
    @IsString()
    descricao: string;
}
