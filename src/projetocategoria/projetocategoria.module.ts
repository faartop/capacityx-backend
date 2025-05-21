import { Module } from '@nestjs/common';
import { ProjetoCategoriaService } from './projetocategoria.service';
import { ProjetoCategoriaController } from './projetocategoria.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ProjetoCategoriaController],
  providers: [ProjetoCategoriaService, PrismaService],
})
export class ProjetoCategoriaModule {}
