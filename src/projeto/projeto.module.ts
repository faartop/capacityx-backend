import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ProjetoController],
  providers: [ProjetoService, PrismaService],
})
export class ProjetoModule {}
