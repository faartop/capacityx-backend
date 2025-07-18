import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contrato')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratoService.create(createContratoDto);
  }

  @Get()
  findAll(
    @Query('id_cliente') id_cliente?: number,
    @Query('id_categoria') id_categoria?: number,
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.contratoService.findAll(id_categoria, id_cliente, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateContratoDto: UpdateContratoDto) {
    return this.contratoService.update(+id, updateContratoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contratoService.remove(+id);
  }
}
