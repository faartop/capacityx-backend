import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BloqueioAgendaService } from './bloqueioagenda.service';
import { CreateBloqueioAgendaDto } from './dto/create-bloqueioagenda.dto';
import { UpdateBloqueioAgendaDto } from './dto/update-bloqueioagenda.dto';
import { ParseISODatePipe } from '../common/pipes/parse-iso-date.pipe';

@Controller('bloqueioagenda')
export class BloqueioAgendaController {
  constructor(private readonly bloqueioagendaService: BloqueioAgendaService) {}

  @Post()
  create(@Body() createBloqueioAgendaDto: CreateBloqueioAgendaDto) {
    return this.bloqueioagendaService.create(createBloqueioAgendaDto);
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
    return this.bloqueioagendaService.findAll(competencia, id_tecnico, id_contrato, id_item_projeto_categoria, sort, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bloqueioagendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBloqueioAgendaDto: UpdateBloqueioAgendaDto) {
    return this.bloqueioagendaService.update(+id, updateBloqueioAgendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bloqueioagendaService.remove(+id);
  }
}
