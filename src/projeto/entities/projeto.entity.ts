export class Projeto {
    id: number;
    id_cliente: number;
    nome: string;
    data_inicio: Date;
    data_fim: Date;
    data_alinhamento?: Date | null;
    data_entrega?: Date | null;
    data_parada?: Date | null;
    data_cancelamento?: Date | null;
    dias_garantia: number;
    qtd_horas: number;
    envio_financeiro: string;
}