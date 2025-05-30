import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('status') status: 'true' | 'false' | 'all' = 'all',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.clienteService.findAll(nome, status, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clienteService.remove(+id);
  }
}
