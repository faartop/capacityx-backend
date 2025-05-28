import { Injectable } from '@nestjs/common';
import { CreateCategoriaPaiDto } from './dto/create-categoriapai.dto';
import { UpdateCategoriaPaiDto } from './dto/update-categoriapai.dto';
import { CategoriaPai } from './entities/categoriapai.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class CategoriaPaiService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(categoriaPai: any): CategoriaPai {
    return {
      id: categoriaPai.id,
      descricao: categoriaPai.descricao,
      inicio_vigencia: categoriaPai.inicio_vigencia,
      fim_vigencia: categoriaPai.fim_vigencia
    }
  }

  async findAll(
    descricao?: string,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Promise <CategoriaPai[]>{

    const filtroFimVigencia =
      fim_vigencia === 'null' ? { fim_vigencia: null }
      : fim_vigencia === 'notNull' ? { fim_vigencia: { not: null } }
      : {};

    const categoriaPai = await this.prisma.categoriaPai.findMany({
      where: {
        descricao: descricao
          ? {
            contains: descricao,
            mode: 'insensitive',
          }
          : undefined,
        ...filtroFimVigencia,
      },
      orderBy: {
        'descricao': direction
      }
    });

    return categoriaPai.map(
      categoriaPai => this.mapToEntity(categoriaPai)
    )
  }

  async findOne(id: number): Promise <CategoriaPai> {
  
    const categoriaPai = await this.prisma.categoriaPai.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(categoriaPai);
  }

  async create(createCategoriaPaiDto: CreateCategoriaPaiDto): Promise<CategoriaPai> {
  const data = {
    ...createCategoriaPaiDto,
    inicio_vigencia: new Date(createCategoriaPaiDto.inicio_vigencia),
    fim_vigencia: createCategoriaPaiDto.fim_vigencia ? new Date(createCategoriaPaiDto.fim_vigencia) : null
  };

  const categoriaPai = await this.prisma.categoriaPai.create({
    data: {
      ...data,
      fim_vigencia: data.fim_vigencia as Date | null
    }
  });

  return this.mapToEntity(categoriaPai);
}

  async update(id: number, updateCategoriaPaiDto: UpdateCategoriaPaiDto): Promise<CategoriaPai> {
    const categoriaPai = await this.prisma.categoriaPai.update({
      where: {
        id
      },
      data: {
        descricao: updateCategoriaPaiDto.descricao,
        inicio_vigencia: updateCategoriaPaiDto.inicio_vigencia,
        fim_vigencia: updateCategoriaPaiDto.fim_vigencia,
      }
    })

    return this.mapToEntity(categoriaPai);
  }

  async remove(id: number): Promise <CategoriaPai> {
    const categoriaPai = await this.prisma.categoriaPai.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(categoriaPai);
  }
}
