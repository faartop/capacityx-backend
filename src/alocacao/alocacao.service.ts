import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao } from './entities/alocacao.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class AlocacaoService {

  constructor(private prisma: PrismaService) {
  }

  private mapToEntity(alocacao: any): Alocacao {
    return {
      id: alocacao.id,
      competencia: alocacao.competencia,
      id_tecnico: alocacao.id_tecnico,
      id_contrato: alocacao.id_contrato,
      id_item_projeto_categoria: alocacao.id_item_projeto_categoria,
      qtd_hrs_alocadas: alocacao.qtd_hrs_alocadas,
      qtd_hrs_comerciais: alocacao.qtd_hrs_comerciais,
      data_exclusao: alocacao.data_exclusao,
      tecnico: alocacao.tecnico
        ? {
          ...alocacao.tecnico,
          usuario: alocacao.tecnico.usuario
            ? { nome: alocacao.tecnico.usuario.nome }
            : undefined,
          categoria: alocacao.tecnico.categoria
            ? { descricao: alocacao.tecnico.categoria.descricao }
            : undefined,
        }
        : undefined,
      contrato: alocacao.contrato
        ? {
          ...alocacao.contrato,
          cliente: alocacao.contrato.cliente
            ? { nome: alocacao.contrato.cliente.nome }
            : undefined,
          categoria: alocacao.contrato.categoria
            ? { descricao: alocacao.contrato.categoria.descricao }
            : undefined,
          prioridade: alocacao.contrato.prioridade
            ? { descricao: alocacao.contrato.prioridade.descricao }
            : undefined,
          tipo_atendimento: alocacao.contrato.tipo_atendimento
            ? { descricao: alocacao.contrato.tipo_atendimento.descricao }
            : undefined,
          tipo_contrato: alocacao.contrato.tipo_contrato
            ? { descricao: alocacao.contrato.tipo_contrato.descricao }
            : undefined,
        }
        : undefined,
      item_projeto_categoria: alocacao.item_projeto_categoria
        ? {
          ...alocacao.item_projeto_categoria,
          projeto_categoria: alocacao.item_projeto_categoria.projeto_categoria
            ? {
              projeto: alocacao.item_projeto_categoria.projeto_categoria.projeto
                ? {
                  nome: alocacao.item_projeto_categoria.projeto_categoria.projeto.nome,
                  cliente: alocacao.item_projeto_categoria.projeto_categoria.projeto.cliente
                    ? { nome: alocacao.item_projeto_categoria.projeto_categoria.projeto.cliente.nome }
                    : undefined,
                }
                : undefined,
              categoria: alocacao.item_projeto_categoria.projeto_categoria.categoria
                ? { descricao: alocacao.item_projeto_categoria.projeto_categoria.categoria.descricao }
                : undefined,
            }
            : undefined,
        }
        : undefined,
    };
  }

  private ajustarCompetencia(date: Date | string): Date {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Data de competência inválida');
    }
    return new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);
  }

  private validarCategoriaOuContrato(id_contrato?: number | null, id_item_projeto_categoria?: number | null): void {
    if ((id_contrato === null || id_contrato === undefined) && (id_item_projeto_categoria === null || id_item_projeto_categoria === undefined)) {
      throw new BadRequestException('É obrigatório informar um Contrato ou Projeto');
    }
    if (id_contrato && id_item_projeto_categoria) {
      throw new BadRequestException('Informe apenas Contrato ou Projeto');
    }
  }

  private async calcularHrsComerciais(id_tecnico: number, qtd_hrs_alocadas: number): Promise<number> {
    const tecnico = await this.prisma.tecnico.findUnique({
      where: { id: id_tecnico },
      select: { know_how: true },
    });

    if (!tecnico) {
      throw new BadRequestException('Técnico não encontrado');
    }

    return qtd_hrs_alocadas * tecnico.know_how;
  }

  async findAll(
    competencia?: Date,
    id_tecnico?: number,
    id_contrato?: number,
    id_item_projeto_categoria?: number,
    sort: 'competencia' | 'qtd_hrs_alocadas' | 'qtd_hrs_comerciais' = 'competencia',
    direction: 'asc' | 'desc' = 'asc',
  ): Promise<Alocacao[]> {
    const alocacao = await this.prisma.alocacao.findMany({
      where: {
        competencia: competencia !== undefined ? this.ajustarCompetencia(competencia) : undefined,
        id_tecnico: id_tecnico !== undefined ? id_tecnico : undefined,
        id_contrato: id_contrato !== undefined ? id_contrato : undefined,
        id_item_projeto_categoria: id_item_projeto_categoria !== undefined ? id_item_projeto_categoria : undefined,
        data_exclusao: null,
      },
      include: {
        tecnico: {
          include: {
            usuario: true,
            categoria: true,
          },
        },
        contrato: {
          include: {
            cliente: true,
            categoria: true,
            prioridade: true,
            tipo_atendimento: true,
            tipo_contrato: true,
          },
        },
        item_projeto_categoria: {
          include: {
            projeto_categoria: {
              include: {
                projeto: {
                  include: {
                    cliente: true,
                  },
                },
                categoria: true,
              },
            },
          },
        },
      },
      orderBy: {
        [sort]: direction,
      },
    });

    return alocacao.map((alocacao) => this.mapToEntity(alocacao));
  }

  async findOne(id: number): Promise<Alocacao> {
    const alocacao = await this.prisma.alocacao.findUnique({
      where: {
        id,
      },
      include: {
        tecnico: {
          include: {
            usuario: true,
            categoria: true,
          },
        },
        contrato: {
          include: {
            cliente: true,
            categoria: true,
            prioridade: true,
            tipo_atendimento: true,
            tipo_contrato: true,
          },
        },
        item_projeto_categoria: {
          include: {
            projeto_categoria: {
              include: {
                projeto: {
                  include: {
                    cliente: true,
                  },
                },
                categoria: true,
              },
            },
          },
        },
      },
    });

    if (!alocacao) {
      throw new BadRequestException('Alocação não encontrada');
    }

    return this.mapToEntity(alocacao);
  }

  async create(createAlocacaoDto: CreateAlocacaoDto): Promise<Alocacao> {
    this.validarCategoriaOuContrato(createAlocacaoDto.id_contrato, createAlocacaoDto.id_item_projeto_categoria);

    if (!createAlocacaoDto.competencia) {
      throw new BadRequestException('Competência é obrigatória');
    }

    const competencia = this.ajustarCompetencia(createAlocacaoDto.competencia);

    if (createAlocacaoDto.id_tecnico === undefined || createAlocacaoDto.qtd_hrs_alocadas === undefined) {
      throw new BadRequestException('id_tecnico e qtd_hrs_alocadas são obrigatórios');
    }

    const qtd_hrs_comerciais = await this.calcularHrsComerciais(
      createAlocacaoDto.id_tecnico,
      createAlocacaoDto.qtd_hrs_alocadas,
    );

    const data = {
      ...createAlocacaoDto,
      competencia,
      qtd_hrs_comerciais,
      data_exclusao: createAlocacaoDto.data_exclusao ? new Date(createAlocacaoDto.data_exclusao) : null,
    };

    const alocacao = await this.prisma.alocacao.create({
      data: {
        ...data,
        data_exclusao: data.data_exclusao as Date | null,
      },
    });

    return this.mapToEntity(alocacao);
  }

  async update(id: number, updateAlocacaoDto: UpdateAlocacaoDto): Promise<Alocacao> {
    this.validarCategoriaOuContrato(updateAlocacaoDto.id_contrato, updateAlocacaoDto.id_item_projeto_categoria);

    if (!updateAlocacaoDto.competencia) {
      throw new BadRequestException('Competência é obrigatória');
    }
    const competencia = this.ajustarCompetencia(updateAlocacaoDto.competencia);

    if (updateAlocacaoDto.id_tecnico === undefined || updateAlocacaoDto.qtd_hrs_alocadas === undefined) {
      throw new BadRequestException('id_tecnico e qtd_hrs_alocadas são obrigatórios');
    }
    const qtd_hrs_comerciais = await this.calcularHrsComerciais(
      updateAlocacaoDto.id_tecnico,
      updateAlocacaoDto.qtd_hrs_alocadas,
    );

    const alocacao = await this.prisma.alocacao.update({
      where: { id },
      data: {
        ...updateAlocacaoDto,
        competencia,
        qtd_hrs_comerciais,
        data_exclusao: updateAlocacaoDto.data_exclusao ? new Date(updateAlocacaoDto.data_exclusao) : null,
      },
    });

    return this.mapToEntity(alocacao);
  }

  async remove(id: number): Promise<Alocacao> {
    const alocacao = await this.prisma.alocacao.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(alocacao);
  }
}
