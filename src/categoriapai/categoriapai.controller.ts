import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.categoriaPaiService.findAll();
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
