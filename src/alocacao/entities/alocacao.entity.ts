export class Alocacao {
    id: number;
    competencia: Date;
    id_tecnico: number;
    id_contrato?: number;
    id_item_projeto_categoria?: number;
    qtd_hrs_alocadas: number;
    qtd_hrs_comerciais: number;
    data_exclusao?: Date;
    tecnico?: {
        id: number;
        know_how: number;
        inicio_vigencia: Date;
        fim_vigencia?: Date;
        status: boolean;
        id_usuario: number;
        id_categoria: number;
        usuario?: {
            nome: string;
        };
        categoria?: {
            descricao: string;
        };
    };
    contrato?: {
        id: number;
        carga_horaria: number;
        id_categoria: number;
        id_cliente: number;
        presencial: boolean;
        id_prioridade: number;
        id_atendimento: number;
        id_tipo_contrato: number;
        data_inicio: Date;
        data_fim?: Date;
        cliente?: {
            nome: string;
        };
        categoria?: {
            descricao: string;
        };
        prioridade?: {
            descricao: string;
        };
        tipo_atendimento?: {
            descricao: string;
        };
        tipo_contrato?: {
            descricao: string;
        };
    };
    item_projeto_categoria?: {
        id: number;
        descricao: string;
        qtd_horas: number;
        id_projeto_categoria: number;
        data_exclusao?: Date;
        projeto_categoria?: {
            id: number;
            qtd_horas: number;
            id_categoria: number;
            id_projeto: number;
            data_exclusao?: Date;
            projeto?: {
                nome: string;
                cliente?: {
                    nome: string;
                };
            };
            categoria?: {
                descricao: string;
            };
        };
    };
}