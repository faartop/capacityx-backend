export class Cliente {
    id: number;
    nome: string;
    status: boolean
    inicio_vigencia: Date;
    fim_vigencia?: Date | null;
}
