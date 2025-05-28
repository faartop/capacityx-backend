import { Injectable } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjetoService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(projeto: any): Projeto {
    return {
      id: projeto.id,
      id_cliente: projeto.id_cliente,
      nome: projeto.nome,
      data_inicio: projeto.data_inicio,
      data_fim: projeto.data_fim,
      data_alinhamento: projeto.data_alinhamento,
      data_entrega: projeto.data_entrega,
      data_parada: projeto.data_parada,
      data_cancelamento: projeto.data_cancelamento,
      dias_garantia: projeto.dias_garantia,
      qtd_horas: projeto.qtd_horas,
      envio_financeiro: projeto.envio_financeiro
    }
  }

  async findAll(): Promise <Projeto[]>{
    const projeto = await this.prisma.projeto.findMany();

    return projeto.map(
      projeto => this.mapToEntity(projeto)
    )
  }

  async findOne(id: number): Promise <Projeto> {
  
    const projeto = await this.prisma.projeto.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(projeto);
  }

  async create(CreateProjetoDto: CreateProjetoDto): Promise <Projeto> {
    const projeto = await this.prisma.projeto.create({
      data: CreateProjetoDto
    })

    return this.mapToEntity(projeto);
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    const projeto = await this.prisma.projeto.update({
      where: {
        id
      },
      data: {
        id_cliente: updateProjetoDto.id_cliente,
        nome: updateProjetoDto.nome,
        data_inicio: updateProjetoDto.data_inicio,
        data_fim: updateProjetoDto.data_fim,
        data_alinhamento: updateProjetoDto.data_alinhamento,
        data_entrega: updateProjetoDto.data_entrega,
        data_parada: updateProjetoDto.data_parada,
        data_cancelamento: updateProjetoDto.data_cancelamento,
        dias_garantia: updateProjetoDto.dias_garantia,
        qtd_horas: updateProjetoDto.qtd_horas,
        envio_financeiro: updateProjetoDto.envio_financeiro
      }
    })

    return this.mapToEntity(projeto);
  }

  async remove(id: number): Promise <Projeto> {
    const projeto = await this.prisma.projeto.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(projeto);
  }
}
