export class BloqueioAgenda {
    id: number;
    id_usuario: number;
    motivo: string;
    data_inicio: Date;
    data_fim?: Date;
    hora_inicio?: number;
    hora_fim?: number;
    aprovacao: number;
    data_exclusao?: Date;
    usuario?: {
        id: number;
        nome: string;
    }
}