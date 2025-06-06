export class Tecnico {
    id: number;
    id_usuario: number;
    id_categoria: number;
    know_how: number;
    inicio_vigencia: Date;
    fim_vigencia?: Date | null;
    status: boolean;
    usuario?: {
        id: number;
        nome: string;
    } | null;
    categoria?: {
        id: number;
        descricao: string;
    } | null;
}
