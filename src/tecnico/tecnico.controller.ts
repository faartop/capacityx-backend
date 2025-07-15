import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TecnicoService } from './tecnico.service';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

@Controller('tecnico')
export class TecnicoController {
  constructor(private readonly tecnicoService: TecnicoService) {}

  @Post()
  create(@Body() createTecnicoDto: CreateTecnicoDto) {
    return this.tecnicoService.create(createTecnicoDto);
  }

  @Get()
  findAll(
    @Query('id_usuario') id_usuario?: number,
    @Query('id_categoria') id_categoria?: number,
    @Query('status') status: 'true' | 'false' | 'all' = 'all',
    @Query('competencia') competencia?: Date,
    @Query('sort') sort: 'id_usuario' | 'id_categoria' | 'know_how' = 'id_usuario',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.tecnicoService.findAll(id_usuario, id_categoria, status, competencia, sort, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tecnicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTecnicoDto: UpdateTecnicoDto) {
    return this.tecnicoService.update(+id, updateTecnicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tecnicoService.remove(+id);
  }
}
