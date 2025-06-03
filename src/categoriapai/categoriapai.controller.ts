import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriaPaiService } from './categoriapai.service';
import { CreateCategoriaPaiDto } from './dto/create-categoriapai.dto';
import { UpdateCategoriaPaiDto } from './dto/update-categoriapai.dto';

@Controller('categoriaPai')
export class CategoriaPaiController {
  constructor(private readonly categoriaPaiService: CategoriaPaiService) {}

  @Post()
  create(@Body() createCategoriaPaiDto: CreateCategoriaPaiDto) {
    return this.categoriaPaiService.create(createCategoriaPaiDto);
  }

  @Get()
  findAll(
    @Query('descricao') descricao?: string,
    @Query('status') fim_vigencia: 'null' | 'notNull' | 'all' = 'all',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.categoriaPaiService.findAll(descricao, fim_vigencia, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaPaiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoriaPaiDto: UpdateCategoriaPaiDto) {
    return this.categoriaPaiService.update(+id, updateCategoriaPaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriaPaiService.remove(+id);
  }
}
