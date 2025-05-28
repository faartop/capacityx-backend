export class Alocacao {
    id: number;
    id_tecnico: number;
    id_contrato: number | null;
    id_item_projeto_categoria?: number | null;
    qtd_hrs_alocadas: number;
    qtd_hrs_comerciais: number;
}
