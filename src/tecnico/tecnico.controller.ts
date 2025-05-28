import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TecnicoService } from './tecnico.service';
import { CreateTecnicoDto } from './dto/create-tecnico.dto';
import { UpdateTecnicoDto } from './dto/update-tecnico.dto';

@Controller('tecnico')
export class TecnicoController {
  constructor(private readonly tecnicoService: TecnicoService) {}

  @Post()
  create(@Body() createTecnicoDto: CreateTecnicoDto) {
    return this.tecnicoService.create(createTecnicoDto);
  }

  @Get()
  findAll() {
    return this.tecnicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tecnicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTecnicoDto: UpdateTecnicoDto) {
    return this.tecnicoService.update(+id, updateTecnicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tecnicoService.remove(+id);
  }
}
