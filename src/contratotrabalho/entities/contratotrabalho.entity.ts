export class ContratoTrabalho {
    id: number;
    nivel_tecnico: string;
    carga_horaria: number;
    inicio_vigencia: Date;
    fim_vigencia?: Date | null;
    status: boolean;
}
