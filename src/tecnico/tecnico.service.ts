/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';
import { Tecnico } from './entities/tecnico.entity';
import { PrismaService } from 'prisma/prisma.service';
import { statusRegistro } from '../utils/globais';


@Injectable()
export class TecnicoService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(tecnico: any): Tecnico {
    return {
      id: tecnico.id,
      id_usuario: tecnico.id_usuario,
      id_categoria: tecnico.id_categoria,
      know_how: tecnico.know_how,
      inicio_vigencia: tecnico.inicio_vigencia,
      fim_vigencia: tecnico.fim_vigencia,
      status: tecnico.status,
      usuario: tecnico.usuario
        ? {
          id: tecnico.usuario.id,
          nome: tecnico.usuario.nome,
        }
        : null,
      categoria: tecnico.categoria
        ? {
          id: tecnico.categoria.id,
          descricao: tecnico.categoria.descricao,
        }
        : null,
    }
  }

  async findAll(
    id_usuario?: number,
    id_categoria?: number,
    status: 'true' | 'false' | 'all' = 'all',
    competencia?: Date,
    sort: 'id_usuario' | 'id_categoria' | 'know_how' = 'id_usuario',
    direction: 'asc' | 'desc' = 'asc'
  ): Promise <Tecnico[]>{

    const filtroStatus = statusRegistro(status, competencia)

    const tecnico = await this.prisma.tecnico.findMany({
      where: {
        id_usuario: id_usuario ? id_usuario : undefined,
        id_categoria: id_categoria ? id_categoria : undefined,
        ...filtroStatus,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true
          },
        },
        categoria: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
      orderBy: {
        [sort]: direction
      }
    });

    return tecnico.map(
      tecnico => this.mapToEntity(tecnico)
    )
  }

  async findOne(id: number): Promise <Tecnico> {
  
    const tecnico = await this.prisma.tecnico.findUnique({
      where: {
        id
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true
          },
        },
        categoria: {
          select: {
            id: true,
            descricao: true,
          },
        },
      }
    })

    return this.mapToEntity(tecnico);
  }

  async create(createTecnicoDto: CreateTecnicoDto): Promise<Tecnico> {
  const data = {
    ...createTecnicoDto,
    inicio_vigencia: new Date(createTecnicoDto.inicio_vigencia),
    fim_vigencia: createTecnicoDto.fim_vigencia ? new Date(createTecnicoDto.fim_vigencia) : null
  };

  const tecnico = await this.prisma.tecnico.create({
    data: {
      ...data,
      fim_vigencia: data.fim_vigencia as Date | null
    }
  });

  return this.mapToEntity(tecnico);
}

  async update(id: number, updateTecnicoDto: UpdateTecnicoDto): Promise<Tecnico> {
    const tecnico = await this.prisma.tecnico.update({
      where: {
        id
      },
      data: {
        id_usuario: updateTecnicoDto.id_usuario,
        id_categoria: updateTecnicoDto.id_categoria,
        know_how: updateTecnicoDto.know_how,
        inicio_vigencia: updateTecnicoDto.inicio_vigencia,
        fim_vigencia: updateTecnicoDto.fim_vigencia,
        status: updateTecnicoDto.status,
      }
    })

    return this.mapToEntity(tecnico);
  }

  async remove(id: number): Promise <Tecnico> {
    const tecnico = await this.prisma.tecnico.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(tecnico);
  }
}
