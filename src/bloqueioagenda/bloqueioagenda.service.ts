import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBloqueioAgendaDto } from './dto/create-bloqueioagenda.dto';
import { UpdateBloqueioAgendaDto } from './dto/update-bloqueioagenda.dto';
import { BloqueioAgenda } from './entities/bloqueioagenda.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class BloqueioAgendaService {

  constructor(private prisma: PrismaService) {
  }

  private mapToEntity(bloqueioagenda: any): BloqueioAgenda {
    return {
      id: bloqueioagenda.id,
      id_usuario: bloqueioagenda.id_usuario,
      motivo: bloqueioagenda.motivo,
      data_inicio: bloqueioagenda.data_inicio,
      data_fim: bloqueioagenda.data_fim,
      hora_inicio: bloqueioagenda.hora_inicio,
      hora_fim: bloqueioagenda.hora_fim,
      aprovacao: bloqueioagenda.aprovacao,
      data_exclusao: bloqueioagenda.data_exclusao,
      usuario: bloqueioagenda.usuario
        ? {
          id: bloqueioagenda.usuario.id,
          nome: bloqueioagenda.usuario.nome,
        }
        : undefined,
    }
  }

  async findAll(
    id_usuario?: number,
    data_inicio?: Date,
    aprovacao?: number,
    sort: 'data_inicio' | 'data_fim' | 'aprovacao' = 'data_inicio',
    direction: 'asc' | 'desc' = 'asc',
  ): Promise<BloqueioAgenda[]> {
    const bloqueioagenda = await this.prisma.bloqueioAgenda.findMany({
      where: {
        id_usuario: id_usuario,
        data_inicio: data_inicio,
        aprovacao: aprovacao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true
          }
        }
      },
      orderBy: {
        [sort]: direction
      }
    });

    return bloqueioagenda.map((bloqueioagenda) => this.mapToEntity(bloqueioagenda));
  }

  async findOne(id: number): Promise<BloqueioAgenda> {
    const bloqueioagenda = await this.prisma.bloqueioAgenda.findUnique({
      where: {
        id,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true
          }
        }
      },
    });

    if (!bloqueioagenda) {
      throw new BadRequestException('Alocação não encontrada');
    }

    return this.mapToEntity(bloqueioagenda);
  }

  async create(createBloqueioAgendaDto: CreateBloqueioAgendaDto): Promise<BloqueioAgenda> {


    const data = {
      ...createBloqueioAgendaDto,
      data_inicio: new Date(createBloqueioAgendaDto.data_inicio),
      data_fim: createBloqueioAgendaDto.data_fim ? new Date(createBloqueioAgendaDto.data_fim) : null,
      data_exclusao: createBloqueioAgendaDto.data_exclusao ? new Date(createBloqueioAgendaDto.data_exclusao) : null,
    };

    const bloqueioagenda = await this.prisma.bloqueioAgenda.create({
      data: {
        ...data
      },
    });

    return this.mapToEntity(bloqueioagenda);
  }

  async update(id: number, updateBloqueioAgendaDto: UpdateBloqueioAgendaDto): Promise<BloqueioAgenda> {

    const data: Partial<UpdateBloqueioAgendaDto> = {
      id_usuario: updateBloqueioAgendaDto.id_usuario,
      motivo: updateBloqueioAgendaDto.motivo,
      data_fim: updateBloqueioAgendaDto.data_fim ? new Date(updateBloqueioAgendaDto.data_fim) : null,
      hora_inicio: updateBloqueioAgendaDto.hora_inicio,
      aprovacao: updateBloqueioAgendaDto.aprovacao,
      data_exclusao: updateBloqueioAgendaDto.data_exclusao ? new Date(updateBloqueioAgendaDto.data_exclusao) : null,
    }

    if (updateBloqueioAgendaDto.data_inicio !== undefined) {
      data.data_inicio = updateBloqueioAgendaDto.data_inicio;
    }

    const bloqueioagenda = await this.prisma.bloqueioAgenda.update({
      where: {
        id
      },
      data
    });

    return this.mapToEntity(bloqueioagenda);
  }

  async remove(id: number): Promise<BloqueioAgenda> {
    const bloqueioagenda = await this.prisma.bloqueioAgenda.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(bloqueioagenda);
  }
}
