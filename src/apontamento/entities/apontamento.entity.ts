export class Apontamento {
    id: number;
    id_usuario: number;
    id_cliente: number;
    id_categoria: number;
    id_item_projeto_categoria?: number | null;
    data: Date;
    descricao: string;
    extra: boolean;
    status_extra?: number | null;
    resposta_extra?: Date | null;
    observacao_extra?: string | null;
    data_exclusao?: Date | null;
    categoria?: {
        id?: number;
        descricao?: string;
    };
    cliente?: {
        id?: number;
        nome?: string;
    };
    usuario?: {
        id?: number;
        nome?: string;
    };
    item_projeto_categoria?: {
        id?: number;
        descricao?: string;
        projeto_categoria?: {
            id?: number;
            projeto?: {
                id?: number;
                nome?: string;
            };
        };
    };
}
