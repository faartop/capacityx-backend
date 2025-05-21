export class Projeto {
    id: number;
    id_cliente: number;
    nome: string;
    data_inicio: Date;
    data_fim: Date;
    data_alinhamento: Date;
    data_entrega: Date;
    data_parada: Date;
    data_cancelamento: Date;
    dias_garantia: number;
    quantidade_horas: number;
    areas_envolvidas: string;
    envio_financeira: Date;
    valor_proposta: number;
    status: boolean;
    descricao: string;
}