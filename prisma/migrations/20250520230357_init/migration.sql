-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "fim_vigencia" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contrato" ALTER COLUMN "fim_vigencia" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ItemProjetoCategoria" ALTER COLUMN "data_exclusao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Projeto" ALTER COLUMN "data_alinhamento" DROP NOT NULL,
ALTER COLUMN "data_entrega" DROP NOT NULL,
ALTER COLUMN "data_parada" DROP NOT NULL,
ALTER COLUMN "data_cancelamento" DROP NOT NULL,
ALTER COLUMN "areas_envolvidas" DROP NOT NULL,
ALTER COLUMN "envio_financeira" DROP NOT NULL,
ALTER COLUMN "valor_proposta" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjetoCategoria" ALTER COLUMN "data_exclusao" DROP NOT NULL;
