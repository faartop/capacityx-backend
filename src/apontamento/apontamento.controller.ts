import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApontamentoService } from './apontamento.service';
import { CreateApontamentoDto } from './dto/create-apontamento.dto';
import { UpdateApontamentoDto } from './dto/update-apontamento.dto';
import { ParseISODatePipe } from '../common/pipes/parse-iso-date.pipe';

@Controller('apontamento')
export class ApontamentoController {
  constructor(private readonly apontamentoService: ApontamentoService) {}

  @Post()
  create(@Body() createApontamentoDto: CreateApontamentoDto) {
    return this.apontamentoService.create(createApontamentoDto);
  }

  @Get()
  findAll(
    @Query('data', ParseISODatePipe) data?: Date,
    @Query('id_cliente') id_cliente?: number,
    @Query('id_categoria') id_categoria?: number,
    @Query('id_usuario') id_usuario?: number,
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.apontamentoService.findAll(data, id_cliente, id_categoria, id_usuario, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.apontamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateApontamentoDto: UpdateApontamentoDto) {
    return this.apontamentoService.update(+id, updateApontamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.apontamentoService.remove(+id);
  }
}
