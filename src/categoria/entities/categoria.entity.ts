export class Categoria {
    id: number;
    descricao: string;
    inicio_vigencia: Date;
    fim_vigencia?: Date | null;
    id_categoria_pai: number;
    id_responsavel: number;
    categoria_pai?: {
        id?: number;
        descricao?: string;
    };
    responsavel?: {
        id?: number;
        nome?: string;
    }
}
