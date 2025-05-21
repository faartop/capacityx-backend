import { Injectable } from '@nestjs/common';
import { CreateProjetoCategoriaDto } from './dto/create-projetocategoria.dto';
import { UpdateProjetoCategoriaDto } from './dto/update-projetocategoria.dto';
import { ProjetoCategoria } from './entities/projetocategoria.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjetoCategoriaService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(projetocategoria: any): ProjetoCategoria {
    return {
      id: projetocategoria.id,
      quantidade_horas: projetocategoria.quantidade_horas,
      id_categoria: projetocategoria.id_categoria,
      id_projeto: projetocategoria.id_projeto,
      data_exclusao: projetocategoria.data_exclusao
    }
  }

  async findAll(): Promise <ProjetoCategoria[]>{
    const projetocategoria = await this.prisma.projetoCategoria.findMany();

    return projetocategoria.map(
      projetocategoria => this.mapToEntity(projetocategoria)
    )
  }

  async findOne(id: number): Promise <ProjetoCategoria> {

    const projetocategoria = await this.prisma.projetoCategoria.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(projetocategoria);
  }

  async create(CreateProjetoCategoriaDto: CreateProjetoCategoriaDto): Promise <ProjetoCategoria> {
    const projetocategoria = await this.prisma.projetoCategoria.create({
      data: CreateProjetoCategoriaDto
    })

    return this.mapToEntity(projetocategoria);
  }

  async update(id: number, updateProjetoCategoriaDto: UpdateProjetoCategoriaDto): Promise<ProjetoCategoria> {
    const projetocategoria = await this.prisma.projetoCategoria.update({
      where: {
        id
      },
      data: {
        quantidade_horas: updateProjetoCategoriaDto.quantidade_horas,
        id_categoria: updateProjetoCategoriaDto.id_categoria,
        id_projeto: updateProjetoCategoriaDto.id_projeto,
        data_exclusao: updateProjetoCategoriaDto.data_exclusao
      }
    })

    return this.mapToEntity(projetocategoria);
  }

  async remove(id: number): Promise <ProjetoCategoria> {
    const projetocategoria = await this.prisma.projetoCategoria.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(projetocategoria);
  }
}
