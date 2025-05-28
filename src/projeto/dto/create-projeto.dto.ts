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
    data_alinhamento: Date | null;
    
    @IsDate()
    data_entrega: Date | null;
    
    @IsDate()
    data_parada: Date | null;
    
    @IsDate()
    data_cancelamento: Date | null;
    
    @IsNumber()
    dias_garantia: number;
    
    @IsNumber()
    qtd_horas: number;
    
    @IsString()
    envio_financeiro: string;
}
