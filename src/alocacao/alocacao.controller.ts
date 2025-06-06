import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlocacaoService } from './alocacao.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';

@Controller('alocacao')
export class AlocacaoController {
  constructor(private readonly alocacaoService: AlocacaoService) {}

  @Post()
  create(@Body() createAlocacaoDto: CreateAlocacaoDto) {
    return this.alocacaoService.create(createAlocacaoDto);
  }

  @Get()
  findAll() {
    return this.alocacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.alocacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAlocacaoDto: UpdateAlocacaoDto) {
    return this.alocacaoService.update(+id, updateAlocacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.alocacaoService.remove(+id);
  }
}
