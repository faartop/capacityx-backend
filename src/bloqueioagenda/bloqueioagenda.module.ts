import { Module } from '@nestjs/common';
import { BloqueioAgendaService } from './bloqueioagenda.service';
import { BloqueioAgendaController } from './bloqueioagenda.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BloqueioAgendaController],
  providers: [BloqueioAgendaService, PrismaService],
})
export class BloqueioAgendaModule {}
