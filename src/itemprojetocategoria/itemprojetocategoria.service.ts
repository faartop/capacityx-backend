import { Injectable } from '@nestjs/common';
import { CreateItemProjetoCategoriaDto } from './dto/create-itemprojetocategoria.dto';
import { UpdateItemProjetoCategoriaDto } from './dto/update-itemprojetocategoria.dto';
import { ItemProjetoCategoria } from './entities/itemprojetocategoria.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ItemProjetoCategoriaService {
  constructor(private prisma: PrismaService) {}

  private mapToEntity(itemprojetocategoria: any): ItemProjetoCategoria {
    return {
      id: itemprojetocategoria.id,
      descricao: itemprojetocategoria.descricao,
      qtd_horas: itemprojetocategoria.qtd_horas,
      id_projeto_categoria: itemprojetocategoria.id_projeto_categoria,
      data_exclusao: itemprojetocategoria.data_exclusao,
    };
  }

  async findAll(): Promise<ItemProjetoCategoria[]> {
    const itemProjetoCategorias = await this.prisma.itemProjetoCategoria.findMany();
    return itemProjetoCategorias.map(item => this.mapToEntity(item));
  }

  async findOne(id: number): Promise<ItemProjetoCategoria> {
    const itemProjetoCategoria = await this.prisma.itemProjetoCategoria.findUnique({
      where: {
        id
      },
    });
    return this.mapToEntity(itemProjetoCategoria);
  }

  async create(createItemProjetoCategoriaDto: CreateItemProjetoCategoriaDto): Promise<ItemProjetoCategoria> {
    const itemProjetoCategoria = await this.prisma.itemProjetoCategoria.create({
      data: createItemProjetoCategoriaDto,
    });

    return this.mapToEntity(itemProjetoCategoria);
  }

  async update(id: number, updateItemProjetoCategoriaDto: UpdateItemProjetoCategoriaDto): Promise<ItemProjetoCategoria> {
    const itemProjetoCategoria = await this.prisma.itemProjetoCategoria.update({
      where: {
        id
      },
      data: {
        descricao: updateItemProjetoCategoriaDto.descricao,
        qtd_horas: updateItemProjetoCategoriaDto.qtd_horas,
        id_projeto_categoria: updateItemProjetoCategoriaDto.id_projeto_categoria,
        data_exclusao: updateItemProjetoCategoriaDto.data_exclusao,
      },
    });
    return this.mapToEntity(itemProjetoCategoria);
  }

  async remove(id: number): Promise<ItemProjetoCategoria> {
    const itemProjetoCategoria = await this.prisma.itemProjetoCategoria.delete({
      where: {
        id
      },
    });
    return this.mapToEntity(itemProjetoCategoria);
  }
}