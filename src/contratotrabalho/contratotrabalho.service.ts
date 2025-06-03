import { Injectable } from '@nestjs/common';
import { CreateContratoTrabalhoDto } from './dto/create-contratotrabalho.dto';
import { UpdateContratoTrabalhoDto } from './dto/update-contratotrabalho.dto';
import { ContratoTrabalho } from './entities/contratotrabalho.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class ContratoTrabalhoService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(contratoTrabalho: any): ContratoTrabalho {
    return {
      id: contratoTrabalho.id,
      nivel_tecnico: contratoTrabalho.nivel_tecnico,
      carga_horaria: contratoTrabalho.carga_horaria,
      inicio_vigencia: contratoTrabalho.inicio_vigencia,
      fim_vigencia: contratoTrabalho.fim_vigencia,
      status: contratoTrabalho.status
    }
  }

  async findAll(
    nivel_tecnico?: string,
    status: 'true' | 'false' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc'
  ): Promise <ContratoTrabalho[]>{

    const filtroStatus =
      status === 'true' ? { status: true }
        : status === 'false' ? { status: false }
          : {}

    const contratoTrabalho = await this.prisma.contratoTrabalho.findMany({
      where: {
        nivel_tecnico: nivel_tecnico
          ? {
            contains: nivel_tecnico,
            mode: 'insensitive',
          }
          : undefined,
        ...filtroStatus,
      },
      orderBy: {
        'nivel_tecnico': direction
      }
    });

    return contratoTrabalho.map(
      contratoTrabalho => this.mapToEntity(contratoTrabalho)
    )
  }

  async findOne(id: number): Promise <ContratoTrabalho> {
  
    const contratoTrabalho = await this.prisma.contratoTrabalho.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(contratoTrabalho);
  }

  async create(createContratoTrabalhoDto: CreateContratoTrabalhoDto): Promise<ContratoTrabalho> {
  const data = {
    ...createContratoTrabalhoDto,
    inicio_vigencia: new Date(createContratoTrabalhoDto.inicio_vigencia),
    fim_vigencia: createContratoTrabalhoDto.fim_vigencia ? new Date(createContratoTrabalhoDto.fim_vigencia) : null
  };

  const contratoTrabalho = await this.prisma.contratoTrabalho.create({
    data: {
      ...data,
      fim_vigencia: data.fim_vigencia as Date | null
    }
  });

  return this.mapToEntity(contratoTrabalho);
}

  async update(id: number, updateContratoTrabalhoDto: UpdateContratoTrabalhoDto): Promise<ContratoTrabalho> {
    const contratoTrabalho = await this.prisma.contratoTrabalho.update({
      where: {
        id
      },
      data: {
        nivel_tecnico: updateContratoTrabalhoDto.nivel_tecnico,
        carga_horaria: updateContratoTrabalhoDto.carga_horaria,
        inicio_vigencia: updateContratoTrabalhoDto.inicio_vigencia,
        fim_vigencia: updateContratoTrabalhoDto.fim_vigencia,
        status: updateContratoTrabalhoDto.status
      }
    })

    return this.mapToEntity(contratoTrabalho);
  }

  async remove(id: number): Promise <ContratoTrabalho> {
    const contratoTrabalho = await this.prisma.contratoTrabalho.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(contratoTrabalho);
  }
}
