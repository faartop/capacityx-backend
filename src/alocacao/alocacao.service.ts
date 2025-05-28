import { Injectable } from '@nestjs/common';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao } from './entities/alocacao.entity';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class AlocacaoService {

  constructor(private prisma: PrismaService) {
  }

  private mapToEntity(alocacao: any): Alocacao {
    return {
      id: alocacao.id,
      competencia: alocacao.competencia,
      id_tecnico: alocacao.id_tecnico,
      id_contrato: alocacao.id_contrato,
      id_item_projeto_categoria: alocacao.id_item_projeto_categoria,
      qtd_hrs_alocadas: alocacao.qtd_hrs_alocadas,
      qtd_hrs_comerciais: alocacao.qtd_hrs_comerciais,
      data_exclusao: alocacao.data_exclusao,
    };
  }

  async findAll(
    id_tecnico?: number,
    id_contrato?: number,
    id_item_projeto_categoria?: number,
    fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    sort: 'id_tecnico' | 'id_contrato' | 'id_item_projeto_categoria' | 'qtd_hrs_alocadas' | 'qtd_hrs_comerciais' = 'id_tecnico',
    direction: 'asc' | 'desc' = 'asc',
  ): Promise<Alocacao[]> {

    const filtroFimVigencia =
      fim_vigencia === 'null' ? { fim_vigencia: null }
        : fim_vigencia === 'notNull' ? { fim_vigencia: { not: null } }
          : {};

    const alocacao = await this.prisma.alocacao.findMany({
      where: {
        id_tecnico: id_tecnico !== undefined ? id_tecnico : undefined,
        id_contrato: id_contrato !== undefined ? id_contrato : undefined,
        id_item_projeto_categoria: id_item_projeto_categoria !== undefined ? id_item_projeto_categoria : undefined,
        ...filtroFimVigencia,
      },
      orderBy: {
        [sort]: direction,
      },
    });

    return alocacao.map(
      alocacao => this.mapToEntity(alocacao),
    );
  }

  async findOne(id: number): Promise<Alocacao> {

    const alocacao = await this.prisma.alocacao.findUnique({
      where: {
        id,
      },
    });

    return this.mapToEntity(alocacao);
  }

  async create(createAlocacaoDto: CreateAlocacaoDto): Promise<Alocacao> {
    const alocacao = await this.prisma.alocacao.create({
      data: createAlocacaoDto,
    });

    return this.mapToEntity(alocacao);
  }

  async update(id: number, updateAlocacaoDto: UpdateAlocacaoDto): Promise<Alocacao> {
    const alocacao = await this.prisma.alocacao.update({
      where: {
        id,
      },
      data: {
        competencia: updateAlocacaoDto.competencia,
        id_tecnico: updateAlocacaoDto.id_tecnico,
        id_contrato: updateAlocacaoDto.id_contrato,
        id_item_projeto_categoria: updateAlocacaoDto.id_item_projeto_categoria,
        qtd_hrs_alocadas: updateAlocacaoDto.qtd_hrs_alocadas,
        qtd_hrs_comerciais: updateAlocacaoDto.qtd_hrs_comerciais,
        data_exclusao: updateAlocacaoDto.data_exclusao,
      },
    });

    return this.mapToEntity(alocacao);
  }

  async remove(id: number): Promise<Alocacao> {
    const alocacao = await this.prisma.alocacao.delete({
      where: {
        id,
      },
    });

    return this.mapToEntity(alocacao);
  }
}
