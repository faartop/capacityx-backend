import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClienteService {

  constructor(private prisma: PrismaService) {}

  private mapToEntity(cliente: any): Cliente {
    return {
      id: cliente.id,
      nome: cliente.nome,
      status: cliente.status,
      inicio_vigencia: cliente.inicio_vigencia,
      fim_vigencia: cliente.fim_vigencia,
    }
  }

  async findAll(
    nome?: string,
    status: 'true' | 'false' | 'all' = 'all',
    direction: 'asc' | 'desc' = 'asc',
  ): Promise<Cliente[]> {
    const filtroStatus =
      status === 'true' ? { status: true }
        : status === 'false' ? { status: false }
          : {}

    const cliente = await this.prisma.cliente.findMany({
      where: {
        nome: nome
          ? {
            contains: nome,
            mode: 'insensitive',
          }
          : undefined,
        ...filtroStatus,
      },
      orderBy: {
        nome: direction,
      },
    });

    return cliente.map(cliente => this.mapToEntity(cliente));
  }

  async findOne(id: number): Promise <Cliente> {
  
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id
      }
    })

    return this.mapToEntity(cliente);
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
  const data = {
    ...createClienteDto,
    inicio_vigencia: new Date(createClienteDto.inicio_vigencia),
    fim_vigencia: createClienteDto.fim_vigencia ? new Date(createClienteDto.fim_vigencia) : null
  };

  const cliente = await this.prisma.cliente.create({
    data: {
      ...data,
      fim_vigencia: data.fim_vigencia as Date | null
    }
  });

  return this.mapToEntity(cliente);
}

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.prisma.cliente.update({
      where: {
        id
      },
      data: {
        nome: updateClienteDto.nome,
        status: updateClienteDto.status,
        inicio_vigencia: updateClienteDto.inicio_vigencia,
        fim_vigencia: updateClienteDto.fim_vigencia,
      }
    })

    return this.mapToEntity(cliente);
  }

  async remove(id: number): Promise <Cliente> {
    const cliente = await this.prisma.cliente.delete({
      where: {
        id
      }
    })

    return this.mapToEntity(cliente);
  }
}
