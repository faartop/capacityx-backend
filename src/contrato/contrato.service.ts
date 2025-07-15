import { Injectable } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato } from './entities/contrato.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ContratoService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(contrato: any): Contrato {
    return {
      id: contrato.id,
      carga_horaria: contrato.carga_horaria,
      id_categoria: contrato.id_categoria,
      id_cliente: contrato.id_cliente,
      presencial: contrato.presencial,
      id_prioridade: contrato.id_prioridade,
      id_atendimento: contrato.id_atendimento,
      id_tipo_contrato: contrato.id_tipo_contrato,
      data_inicio: contrato.data_inicio,
      data_fim: contrato.data_fim,
      categoria: contrato.categoria
        ? {
          id: contrato.categoria.id,
          descricao: contrato.categoria.descricao,
        }
        : undefined,
      cliente: contrato.cliente
        ? {
          id: contrato.cliente.id,
          nome: contrato.cliente.nome,
        }
        : undefined,
      prioridade: contrato.prioridade
        ? {
          id: contrato.prioridade.id,
          descricao: contrato.prioridade.descricao,
        }
        : undefined,
      tipo_atendimento: contrato.tipo_atendimento
        ? {
          id: contrato.tipo_atendimento.id,
          descricao: contrato.tipo_atendimento.descricao,
        }
        : undefined,
      tipo_contrato: contrato.tipo_contrato
        ? {
          id: contrato.tipo_contrato.id,
          descricao: contrato.tipo_contrato.descricao,
        }
        : undefined,
    };
  }

  async findAll(
    id_categoria?: number,
    id_cliente?: number,
    direction: 'asc' | 'desc' = 'asc',
  ): Promise<Contrato[]> {
    const contrato = await this.prisma.contrato.findMany({
      where: {
        id_categoria: id_categoria,
        id_cliente: id_cliente,
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
        prioridade: {
          select: {
            id: true,
            descricao: true,
          },
        },
        tipo_atendimento: {
          select: {
            id: true,
            descricao: true,
          },
        },
        tipo_contrato: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
      orderBy: {
        'data_inicio': direction,
      },
    });

    return contrato.map((contrato) => this.mapToEntity(contrato));
  }

  async findOne(id: number): Promise<Contrato> {
    const contrato = await this.prisma.contrato.findUnique({
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
        prioridade: {
          select: {
            id: true,
            descricao: true,
          },
        },
        tipo_atendimento: {
          select: {
            id: true,
            descricao: true,
          },
        },
        tipo_contrato: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
    });

    if (!contrato) {
      throw new Error(`Contrato with ID ${id} not found`);
    }

    return this.mapToEntity(contrato);
  }

  async create(createContratoDto: CreateContratoDto): Promise<Contrato> {
    const data = {
      ...createContratoDto,
      data_inicio: new Date(createContratoDto.data_inicio),
      data_fim: new Date(createContratoDto.data_fim),
    };

    const contrato = await this.prisma.contrato.create({
      data: {
        ...data
      },
    });

    return this.mapToEntity(contrato);
  }

  async update(id: number, updateContratoDto: UpdateContratoDto): Promise<Contrato> {
    const data: Partial<UpdateContratoDto> = {
      ...updateContratoDto,
    };

    if (updateContratoDto.data_inicio !== undefined) {
      data.data_inicio = new Date(updateContratoDto.data_inicio);
    }
    if (updateContratoDto.data_fim !== undefined) {
      data.data_fim = new Date(updateContratoDto.data_fim);
    }

    const contrato = await this.prisma.contrato.update({
      where: {
        id,
      },
      data,
    });

    return this.mapToEntity(contrato);
  }

  async remove(id: number): Promise<Contrato> {
    const contrato = await this.prisma.contrato.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(contrato);
  }
}