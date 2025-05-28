import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class UsuarioService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(usuario: any): Usuario {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      nivel_acesso: usuario.nivel_acesso,
      id_contrato_trabalho: usuario.id_contrato_trabalho,
      inicio_vigencia: usuario.inicio_vigencia,
      fim_vigencia: usuario.fim_vigencia,
      status: usuario.status,
    }
  }

  async findAll(
    nome?: string,
    nivel_acesso?: number,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    sort: 'nome' | 'nivel_acesso' = 'nome',
    direction: 'asc' | 'desc' = 'asc'
  ): Promise <Usuario[]>{

    const filtroFimVigencia =
      fim_vigencia === 'null' ? { fim_vigencia: null }
      : fim_vigencia === 'notNull' ? { fim_vigencia: { not: null } }
      : {};

    const usuario = await this.prisma.usuario.findMany({
      where: {
        nome: nome
          ? {
            contains: nome,
            mode: 'insensitive',
          }
          : undefined,
        nivel_acesso: nivel_acesso !== undefined ? nivel_acesso : undefined,
        ...filtroFimVigencia,
      },
      orderBy: {
        [sort]: direction
      }
    });

    return usuario.map(
      usuario => this.mapToEntity(usuario)
    )
  }

  async findOne(id: number): Promise <Usuario> {
  
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(usuario);
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  const data = {
    ...createUsuarioDto,
    inicio_vigencia: new Date(createUsuarioDto.inicio_vigencia),
    fim_vigencia: createUsuarioDto.fim_vigencia ? new Date(createUsuarioDto.fim_vigencia) : null
  };

  const usuario = await this.prisma.usuario.create({
    data: {
      ...data,
      fim_vigencia: data.fim_vigencia as Date | null
    }
  });

  return this.mapToEntity(usuario);
}

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.prisma.usuario.update({
      where: {
        id
      },
      data: {
        nome: updateUsuarioDto.nome,
        email: updateUsuarioDto.email,
        nivel_acesso: updateUsuarioDto.nivel_acesso,
        id_contrato_trabalho: updateUsuarioDto.id_contrato_trabalho,
        inicio_vigencia: updateUsuarioDto.inicio_vigencia,
        fim_vigencia: updateUsuarioDto.fim_vigencia,
        status: updateUsuarioDto.status
      }
    })

    return this.mapToEntity(usuario);
  }

  async remove(id: number): Promise <Usuario> {
    const usuario = await this.prisma.usuario.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(usuario);
  }
}
