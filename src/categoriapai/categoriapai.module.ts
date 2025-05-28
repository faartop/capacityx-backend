import { Module } from '@nestjs/common';
import { CategoriaPaiService } from './categoriapai.service';
import { CategoriaPaiController } from './categoriapai.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CategoriaPaiController],
  providers: [CategoriaPaiService, PrismaService],
})
export class CategoriaPaiModule {}
