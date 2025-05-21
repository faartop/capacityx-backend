import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjetoCategoriaService } from './projetocategoria.service';
import { CreateProjetoCategoriaDto } from './dto/create-projetocategoria.dto';
import { UpdateProjetoCategoriaDto } from './dto/update-projetocategoria.dto';

@Controller('projetocategoria')
export class ProjetoCategoriaController {
  constructor(private readonly projetocategoriaService: ProjetoCategoriaService) {}

  @Post()
  create(@Body() createProjetoCategoriaDto: CreateProjetoCategoriaDto) {
    return this.projetocategoriaService.create(createProjetoCategoriaDto);
  }

  @Get()
  findAll() {
    return this.projetocategoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetocategoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjetoCategoriaDto: UpdateProjetoCategoriaDto) {
    return this.projetocategoriaService.update(+id, updateProjetoCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetocategoriaService.remove(+id);
  }
}
