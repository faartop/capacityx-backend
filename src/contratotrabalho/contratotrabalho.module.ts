import { Module } from '@nestjs/common';
import { ContratoTrabalhoService } from './contratotrabalho.service';
import { ContratoTrabalhoController } from './contratotrabalho.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ContratoTrabalhoController],
  providers: [ContratoTrabalhoService, PrismaService],
})
export class ContratoTrabalhoModule {}
