import { Module } from '@nestjs/common';
import { ItemProjetoCategoriaService } from './itemprojetocategoria.service';
import { ItemProjetoCategoriaController } from './itemprojetocategoria.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ItemProjetoCategoriaController],
  providers: [ItemProjetoCategoriaService, PrismaService],
})
export class ItemProjetoCategoriaModule {}
