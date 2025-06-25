export class Contrato {
    id: number;
    carga_horaria: number;
    id_categoria: number;
    id_cliente: number;
    presencial: boolean;
    id_prioridade: number;
    id_atendimento: number;
    id_tipo_contrato: number;
    data_inicio: Date;
    data_fim: Date;
    categoria?: {
        id?: number;
        descricao?: string;
    };
    cliente?: {
        id?: number;
        nome?: string;
    };
    prioridade?: {
        id?: number;
        descricao?: string;
    };
    atendimento?: {
        id?: number;
        descricao?: string;
    };
    tipo_contrato?: {
        id?: number;
        descricao?: string;
    };
}
