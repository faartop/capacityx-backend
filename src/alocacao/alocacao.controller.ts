import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlocacaoService } from './alocacao.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { ParseISODatePipe } from '../common/pipes/parse-iso-date.pipe';

@Controller('alocacao')
export class AlocacaoController {
  constructor(private readonly alocacaoService: AlocacaoService) {}

  @Post()
  create(@Body() createAlocacaoDto: CreateAlocacaoDto) {
    return this.alocacaoService.create(createAlocacaoDto);
  }

  @Get()
  findAll(
    @Query('competencia', ParseISODatePipe) competencia?: Date,
    @Query('id_tecnico') id_tecnico?: number,
    @Query('id_contrato') id_contrato?: number,
    @Query('id_item_projeto_categoria') id_item_projeto_categoria?: number,
    @Query('sort') sort: 'competencia' | 'qtd_hrs_alocadas' | 'qtd_hrs_comerciais' = 'competencia',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.alocacaoService.findAll(competencia, id_tecnico, id_contrato, id_item_projeto_categoria, sort, direction);
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
