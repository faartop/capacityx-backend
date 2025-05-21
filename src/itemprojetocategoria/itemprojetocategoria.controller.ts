import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemProjetoCategoriaService } from './itemprojetocategoria.service';
import { CreateItemProjetoCategoriaDto } from './dto/create-itemprojetocategoria.dto';
import { UpdateItemProjetoCategoriaDto } from './dto/update-itemprojetocategoria.dto';

@Controller('projetocategoria')
export class ItemProjetoCategoriaController {
  constructor(private readonly projetocategoriaService: ItemProjetoCategoriaService) {}

  @Post()
  create(@Body() createItemProjetoCategoriaDto: CreateItemProjetoCategoriaDto) {
    return this.projetocategoriaService.create(createItemProjetoCategoriaDto);
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
  update(@Param('id') id: string, @Body() updateItemProjetoCategoriaDto: UpdateItemProjetoCategoriaDto) {
    return this.projetocategoriaService.update(+id, updateItemProjetoCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projetocategoriaService.remove(+id);
  }
}
