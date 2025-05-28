import { Injectable } from '@nestjs/common';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';
import { Tecnico } from './entities/tecnico.entity';
import { PrismaService } from 'prisma/prisma.service';


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
      fim_vigencia: tecnico.fim_vigencia
    }
  }

  async findAll(
    id_usuario?: number,
    id_categoria?: number,
    know_how?: number,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    sort: 'id_usuario' | 'id_categoria' | 'know_how' = 'id_usuario',
    direction: 'asc' | 'desc' = 'asc'
  ): Promise <Tecnico[]>{

    const filtroFimVigencia =
      fim_vigencia === 'null' ? { fim_vigencia: null }
      : fim_vigencia === 'notNull' ? { fim_vigencia: { not: null } }
      : {};

    const tecnico = await this.prisma.tecnico.findMany({
      where: {
        id_usuario: id_usuario !== undefined ? id_usuario : undefined,
        id_categoria: id_categoria !== undefined ? id_categoria : undefined,
        know_how: know_how !== undefined ? know_how : undefined,
        ...filtroFimVigencia,
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
