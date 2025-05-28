import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class CategoriaService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(categoria: any): Categoria {
    return {
      id: categoria.id,
      descricao: categoria.descricao,
      inicio_vigencia: categoria.inicio_vigencia,
      fim_vigencia: categoria.fim_vigencia,
      id_categoria_pai: categoria.id_categoria_pai,
      id_responsavel: categoria.id_responsavel
    }
  }

  async findAll(
    descricao?: string,
    id_categoria_pai?: number,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    sort: 'nome' | 'id_categoria_pai' = 'nome',
    direction: 'asc' | 'desc' = 'asc'
  ): Promise <Categoria[]>{

    const filtroFimVigencia =
      fim_vigencia === 'null' ? { fim_vigencia: null }
      : fim_vigencia === 'notNull' ? { fim_vigencia: { not: null } }
      : {};

    const categoria = await this.prisma.categoria.findMany({
      where: {
        descricao: descricao
          ? {
            contains: descricao,
            mode: 'insensitive',
          }
          : undefined,
        id_categoria_pai: id_categoria_pai !== undefined ? id_categoria_pai : undefined,
        ...filtroFimVigencia,
      },
      orderBy: {
        [sort]: direction
      }
    });

    return categoria.map(
      categoria => this.mapToEntity(categoria)
    )
  }

  async findOne(id: number): Promise <Categoria> {
  
    const categoria = await this.prisma.categoria.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(categoria);
  }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
  const data = {
    ...createCategoriaDto,
    inicio_vigencia: new Date(createCategoriaDto.inicio_vigencia),
    fim_vigencia: createCategoriaDto.fim_vigencia ? new Date(createCategoriaDto.fim_vigencia) : null
  };

  const categoria = await this.prisma.categoria.create({
    data: {
      ...data,
      fim_vigencia: data.fim_vigencia as Date | null
    }
  });

  return this.mapToEntity(categoria);
}

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.prisma.categoria.update({
      where: {
        id
      },
      data: {
        descricao: updateCategoriaDto.descricao,
        inicio_vigencia: updateCategoriaDto.inicio_vigencia,
        fim_vigencia: updateCategoriaDto.fim_vigencia,
        id_categoria_pai: updateCategoriaDto.id_categoria_pai,
        id_responsavel: updateCategoriaDto.id_responsavel,
      }
    })

    return this.mapToEntity(categoria);
  }

  async remove(id: number): Promise <Categoria> {
    const categoria = await this.prisma.categoria.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(categoria);
  }
}
