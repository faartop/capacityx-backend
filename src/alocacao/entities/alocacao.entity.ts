export class Alocacao {
    id: number;
    competencia: Date;
    id_tecnico: number;
    id_contrato: number | null;
    id_item_projeto_categoria?: number | null;
    qtd_hrs_alocadas: number;
    qtd_hrs_comerciais: number;
    data_exclusao?: Date | null;
}
