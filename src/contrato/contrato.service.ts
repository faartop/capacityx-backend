import { Injectable } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato } from './entities/contrato.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ContratoService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(contrato: any): Contrato {
    return {
      id: contrato.id,
      carga_horaria: contrato.carga_horaria,
      id_categoria: contrato.id_categoria,
      id_cliente: contrato.id_cliente,
      presencial: contrato.presencial,
      id_prioridade: contrato.id_prioridade,
      id_atendimento: contrato.id_atendimento,
      id_tipo_contrato: contrato.id_tipo_contrato,
      data_inicio: contrato.data_inicio,
      data_fim: contrato.data_fim,
    }
  }

  async findAll(): Promise <Contrato[]>{
    const contrato = await this.prisma.contrato.findMany();

    return contrato.map(
      contrato => this.mapToEntity(contrato)
    )
  }

  async findOne(id: number): Promise <Contrato> {
  
    const contrato = await this.prisma.contrato.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(contrato);
  }

  async create(CreateContratoDto: CreateContratoDto): Promise <Contrato> {
    const contrato = await this.prisma.contrato.create({
      data: CreateContratoDto
    })

    return this.mapToEntity(contrato);
  }

  async update(id: number, updateContratoDto: UpdateContratoDto): Promise<Contrato> {
    const contrato = await this.prisma.contrato.update({
      where: {
        id
      },
      data: {
        carga_horaria: updateContratoDto.carga_horaria,
        id_categoria: updateContratoDto.id_categoria,
        id_cliente: updateContratoDto.id_cliente,
        presencial: updateContratoDto.presencial,
        id_prioridade: updateContratoDto.id_prioridade,
        id_atendimento: updateContratoDto.id_atendimento,
        id_tipo_contrato: updateContratoDto.id_tipo_contrato,
        data_inicio: updateContratoDto.data_inicio,
        data_fim: updateContratoDto.data_fim,
      }
    })

    return this.mapToEntity(contrato);
  }

  async remove(id: number): Promise <Contrato> {
    const contrato = await this.prisma.contrato.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(contrato);
  }
}
