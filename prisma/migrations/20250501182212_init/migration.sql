-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "carga_horaria" INTEGER NOT NULL,
    "id_tecnologia" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "presencial" BOOLEAN NOT NULL,
    "area_responsavel" TEXT NOT NULL,
    "id_prioridade" INTEGER NOT NULL,
    "id_atendimento" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_tipo_contrato" INTEGER NOT NULL,
    "inicio_vigencia" TIMESTAMP(3) NOT NULL,
    "fim_vigencia" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "data_alinhamento" TIMESTAMP(3) NOT NULL,
    "data_entrega" TIMESTAMP(3) NOT NULL,
    "data_parada" TIMESTAMP(3) NOT NULL,
    "data_cancelamento" TIMESTAMP(3) NOT NULL,
    "dias_garantia" INTEGER NOT NULL,
    "quantidade_horas" INTEGER NOT NULL,
    "areas_envolvidas" TEXT NOT NULL,
    "envio_financeira" TIMESTAMP(3) NOT NULL,
    "valor_proposta" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjetoCategoria" (
    "id" SERIAL NOT NULL,
    "quantidade_horas" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_projeto" INTEGER NOT NULL,
    "data_exclusao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjetoCategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemProjetoCategoria" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade_horas" INTEGER NOT NULL,
    "id_projeto_categoria" INTEGER NOT NULL,
    "data_exclusao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemProjetoCategoria_pkey" PRIMARY KEY ("id")
);
