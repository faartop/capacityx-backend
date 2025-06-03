import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContratoTrabalhoService } from './contratotrabalho.service';
import { CreateContratoTrabalhoDto } from './dto/create-contratotrabalho.dto';
import { UpdateContratoTrabalhoDto } from './dto/update-contratotrabalho.dto';

@Controller('contratoTrabalho')
export class ContratoTrabalhoController {
  constructor(private readonly contratoTrabalhoService: ContratoTrabalhoService) {}

  @Post()
  create(@Body() createContratoTrabalhoDto: CreateContratoTrabalhoDto) {
    return this.contratoTrabalhoService.create(createContratoTrabalhoDto);
  }

  @Get()
  findAll(
    @Query('nivel_tecnico') nivel_tecnico?: string,
    @Query('status') status: 'true' | 'false' | 'all' = 'all',
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.contratoTrabalhoService.findAll(nivel_tecnico, status, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contratoTrabalhoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateContratoTrabalhoDto: UpdateContratoTrabalhoDto) {
    return this.contratoTrabalhoService.update(+id, updateContratoTrabalhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contratoTrabalhoService.remove(+id);
  }
}
