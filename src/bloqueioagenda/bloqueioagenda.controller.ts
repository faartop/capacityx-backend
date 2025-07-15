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
    @Query('id_usuario') id_usuario?: number,
    @Query('data_inicio', ParseISODatePipe) data_inicio?: Date,
    @Query('aprovacao') aprovacao?: number,
    @Query('sort') sort: 'data_inicio' | 'data_fim' | 'aprovacao' = 'data_inicio',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.bloqueioagendaService.findAll(id_usuario, data_inicio, aprovacao, sort, direction);
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
