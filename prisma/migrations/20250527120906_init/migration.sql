/*
  Warnings:

  - You are about to drop the column `id_usuario` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `area_responsavel` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `fim_vigencia` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `id_tecnologia` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `inicio_vigencia` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_horas` on the `ItemProjetoCategoria` table. All the data in the column will be lost.
  - You are about to drop the column `areas_envolvidas` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `envio_financeira` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_horas` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `valor_proposta` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_horas` on the `ProjetoCategoria` table. All the data in the column will be lost.
  - Added the required column `data_inicio` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_categoria` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_horas` to the `ItemProjetoCategoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `envio_financeiro` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_horas` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_horas` to the `ProjetoCategoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "id_usuario";

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "area_responsavel",
DROP COLUMN "fim_vigencia",
DROP COLUMN "id_tecnologia",
DROP COLUMN "id_usuario",
DROP COLUMN "inicio_vigencia",
ADD COLUMN     "data_fim" TIMESTAMP(3),
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
ALTER COLUMN "carga_horaria" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "presencial" SET DEFAULT false;

-- AlterTable
ALTER TABLE "ItemProjetoCategoria" DROP COLUMN "quantidade_horas",
ADD COLUMN     "qtd_horas" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "areas_envolvidas",
DROP COLUMN "descricao",
DROP COLUMN "envio_financeira",
DROP COLUMN "quantidade_horas",
DROP COLUMN "status",
DROP COLUMN "valor_proposta",
ADD COLUMN     "envio_financeiro" TEXT NOT NULL,
ADD COLUMN     "qtd_horas" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "ProjetoCategoria" DROP COLUMN "quantidade_horas",
ADD COLUMN     "qtd_horas" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "ContratoTrabalho" (
    "id" SERIAL NOT NULL,
    "nivel_tecnico" TEXT NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "ContratoTrabalho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel_acesso" INTEGER NOT NULL,
    "id_contrato_trabalho" INTEGER NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaPai" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),

    CONSTRAINT "CategoriaPai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "id_categoria_pai" INTEGER NOT NULL,
    "id_responsavel" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tecnico" (
    "id" SERIAL NOT NULL,
    "know_how" DOUBLE PRECISION NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "Tecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloqueioAgenda" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "hora_inicio" DOUBLE PRECISION,
    "hora_fim" DOUBLE PRECISION,
    "aprovacao" INTEGER NOT NULL DEFAULT 1,
    "data_exclusao" TIMESTAMP(3),

    CONSTRAINT "BloqueioAgenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prioridade" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "grau" INTEGER NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Prioridade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoAtendimento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "TipoAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoContrato" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "TipoContrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apontamento" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_item_projeto_categoria" INTEGER,
    "data" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "extra" BOOLEAN NOT NULL DEFAULT false,
    "data_exclusao" TIMESTAMP(3),
    "status_extra" INTEGER,
    "resposta_extra" TIMESTAMP(3),
    "observacao_extra" TEXT,

    CONSTRAINT "Apontamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alocacao" (
    "id" SERIAL NOT NULL,
    "id_tecnico" INTEGER NOT NULL,
    "id_contrato" INTEGER,
    "id_item_projeto_categoria" INTEGER,
    "qtd_hrs_alocadas" DOUBLE PRECISION NOT NULL,
    "qtd_hrs_comerciais" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Alocacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaturamentoProjeto" (
    "id" SERIAL NOT NULL,
    "id_projeto" INTEGER NOT NULL,
    "serie_nota" INTEGER NOT NULL,
    "nr_nota" INTEGER NOT NULL,
    "data_faturamento" TIMESTAMP(3) NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "data_pagamento" TIMESTAMP(3),
    "data_exclusao" TIMESTAMP(3),
    "observacao" TEXT,

    CONSTRAINT "FaturamentoProjeto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_contrato_trabalho_fkey" FOREIGN KEY ("id_contrato_trabalho") REFERENCES "ContratoTrabalho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_id_categoria_pai_fkey" FOREIGN KEY ("id_categoria_pai") REFERENCES "CategoriaPai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_id_responsavel_fkey" FOREIGN KEY ("id_responsavel") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tecnico" ADD CONSTRAINT "Tecnico_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tecnico" ADD CONSTRAINT "Tecnico_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloqueioAgenda" ADD CONSTRAINT "BloqueioAgenda_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_id_prioridade_fkey" FOREIGN KEY ("id_prioridade") REFERENCES "Prioridade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_id_atendimento_fkey" FOREIGN KEY ("id_atendimento") REFERENCES "TipoAtendimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_id_tipo_contrato_fkey" FOREIGN KEY ("id_tipo_contrato") REFERENCES "TipoContrato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoCategoria" ADD CONSTRAINT "ProjetoCategoria_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjetoCategoria" ADD CONSTRAINT "ProjetoCategoria_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemProjetoCategoria" ADD CONSTRAINT "ItemProjetoCategoria_id_projeto_categoria_fkey" FOREIGN KEY ("id_projeto_categoria") REFERENCES "ProjetoCategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apontamento" ADD CONSTRAINT "Apontamento_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apontamento" ADD CONSTRAINT "Apontamento_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apontamento" ADD CONSTRAINT "Apontamento_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apontamento" ADD CONSTRAINT "Apontamento_id_item_projeto_categoria_fkey" FOREIGN KEY ("id_item_projeto_categoria") REFERENCES "ItemProjetoCategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_id_tecnico_fkey" FOREIGN KEY ("id_tecnico") REFERENCES "Tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_id_contrato_fkey" FOREIGN KEY ("id_contrato") REFERENCES "Contrato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_id_item_projeto_categoria_fkey" FOREIGN KEY ("id_item_projeto_categoria") REFERENCES "ItemProjetoCategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaturamentoProjeto" ADD CONSTRAINT "FaturamentoProjeto_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
