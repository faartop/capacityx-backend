import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll(
    @Query('nome') nome?: string,
    @Query('status') status: 'true' | 'false' | 'all' = 'all',
    @Query('competencia') competencia?: Date,
    @Query('direction') direction: 'asc' | 'desc' = 'asc',
  ) {
    return this.usuarioService.findAll(nome, status, competencia, direction);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(+id);
  }
}
