import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApontamentoDto } from './dto/create-apontamento.dto';
import { UpdateApontamentoDto } from './dto/update-apontamento.dto';
import { Apontamento } from './entities/apontamento.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ApontamentoService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(apontamento: any): Apontamento {
    return {
      id: apontamento.id,
      id_usuario: apontamento.id_usuario,
      id_cliente: apontamento.id_cliente,
      id_categoria: apontamento.id_categoria,
      id_item_projeto_categoria: apontamento.id_item_projeto_categoria,
      data: apontamento.data,
      horas: apontamento.horas,
      descricao: apontamento.descricao,
      extra: apontamento.extra,
      status_extra: apontamento.status_extra,
      resposta_extra: apontamento.resposta_extra,
      observacao_extra: apontamento.observacao_extra,
      data_exclusao: apontamento.data_exclusao,
      categoria: apontamento.categoria
        ? {
          id: apontamento.categoria.id,
          descricao: apontamento.categoria.descricao,
        }
        : undefined,
      cliente: apontamento.cliente
        ? {
          id: apontamento.cliente.id,
          nome: apontamento.cliente.nome,
        }
        : undefined,
      usuario: apontamento.usuario
        ? {
          id: apontamento.usuario.id,
          nome: apontamento.usuario.nome,
        }
        : undefined,
      item_projeto_categoria: apontamento.item_projeto_categoria
        ? {
          id: apontamento.item_projeto_categoria.id,
          descricao: apontamento.item_projeto_categoria.descricao,
          projeto_categoria: apontamento.item_projeto_categoria.projeto_categoria
            ? {
              id: apontamento.item_projeto_categoria.projeto_categoria.id,
              projeto: apontamento.item_projeto_categoria.projeto_categoria.projeto
                ? {
                  id: apontamento.item_projeto_categoria.projeto_categoria.projeto.id,
                  nome: apontamento.item_projeto_categoria.projeto_categoria.projeto.nome,
                }
                : undefined,
            }
            : undefined,
        }
        : undefined,
    };
  }

  private async verificaCategoria(id_usuario: number, id_categoria: number, data: Date) {
    const tecnico = await this.prisma.tecnico.findFirst({
      where: {
        id_usuario: id_usuario,
        id_categoria: id_categoria,
        inicio_vigencia: { lte: data },
        OR: [
          { fim_vigencia: { gte: data } },
          { fim_vigencia: null }
        ],
      },
      select: {
        id_usuario: true,
        id_categoria: true
      }
    });

    if (!tecnico) {
      throw new BadRequestException('O técnico não possui proeficiência nesta categoria')
    }
  }

  async findAll(
    data?: Date,
    id_categoria?: number,
    id_cliente?: number,
    id_usuario?: number,
    direction: 'asc' | 'desc' = 'asc',
  ): Promise<Apontamento[]> {
    const apontamento = await this.prisma.apontamento.findMany({
      where: {
        data: data,
        id_categoria: id_categoria,
        id_cliente: id_cliente,
        id_usuario: id_usuario,
      },
      include: {
        categoria: {
          select: {
            id: true,
            descricao: true,
          },
        },
        cliente: {
          select: {
            id: true,
            nome: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        item_projeto_categoria: {
          include: {
            projeto_categoria: {
              include: {
                projeto: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        data: direction,
      },
    });

    return apontamento.map((apontamento) => this.mapToEntity(apontamento));
  }

  async findOne(id: number): Promise<Apontamento> {
    const apontamento = await this.prisma.apontamento.findUnique({
      where: {
        id,
      },
      include: {
        categoria: {
          select: {
            id: true,
            descricao: true,
          },
        },
        cliente: {
          select: {
            id: true,
            nome: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        item_projeto_categoria: {
          include: {
            projeto_categoria: {
              include: {
                projeto: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!apontamento) {
      throw new Error(`Apontamento with ID ${id} not found`);
    }

    return this.mapToEntity(apontamento);
  }

  async create(createApontamentoDto: CreateApontamentoDto): Promise<Apontamento> {

    await this.verificaCategoria(
      createApontamentoDto.id_usuario,
      createApontamentoDto.id_categoria,
      createApontamentoDto.data
    )

    const data = {
      ...createApontamentoDto,
      data: new Date(createApontamentoDto.data),
      resposta_extra: createApontamentoDto.resposta_extra ? new Date(createApontamentoDto.resposta_extra) : null,
      data_exclusao: createApontamentoDto.data_exclusao ? new Date(createApontamentoDto.data_exclusao) : null,
    };

    const apontamento = await this.prisma.apontamento.create({
      data: {
        ...data
      },
    });

    return this.mapToEntity(apontamento);
  }

  async update(id: number, updateApontamentoDto: UpdateApontamentoDto): Promise<Apontamento> {

    if (!updateApontamentoDto.id_usuario || !updateApontamentoDto.id_categoria || !updateApontamentoDto.data) {
      throw new BadRequestException('Verifique os campos obrigatórios')
    }

    await this.verificaCategoria(
      updateApontamentoDto.id_usuario,
      updateApontamentoDto.id_categoria,
      updateApontamentoDto.data
    )

    const data: Partial<UpdateApontamentoDto> = {
      ...updateApontamentoDto,
    };

    if (updateApontamentoDto.data !== undefined) {
      data.data = new Date(updateApontamentoDto.data);
    }
    if (updateApontamentoDto.resposta_extra !== undefined) {
      data.resposta_extra = updateApontamentoDto.resposta_extra ? new Date(updateApontamentoDto.resposta_extra) : null;
    }
    if (updateApontamentoDto.data_exclusao !== undefined) {
      data.data_exclusao = updateApontamentoDto.data_exclusao ? new Date(updateApontamentoDto.data_exclusao) : null;
    }

    const apontamento = await this.prisma.apontamento.update({
      where: {
        id,
      },
      data,
    });

    return this.mapToEntity(apontamento);
  }

  async remove(id: number): Promise<Apontamento> {
    const apontamento = await this.prisma.apontamento.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(apontamento);
  }
}