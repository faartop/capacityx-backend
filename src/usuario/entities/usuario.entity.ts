export class Usuario {
    id: number;
    nome: string;
    email: string;
    nivel_acesso: number;
    id_contrato_trabalho: number;
    inicio_vigencia: Date;
    fim_vigencia?: Date | null;
    status: boolean;
    contrato_trabalho?: {
        id: number;
        nivel_tecnico: string;
    } | null;
}
