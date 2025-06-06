import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll(
    @Query('descricao') descricao?: string,
    @Query('id_categoria_pai') id_categoria_pai?: number,
    @Query('fim_vigencia') fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    @Query('sort') sort: 'descricao' | 'id_categoria_pai' = 'descricao',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.categoriaService.findAll(descricao, id_categoria_pai, fim_vigencia, sort, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(+id);
  }
}
