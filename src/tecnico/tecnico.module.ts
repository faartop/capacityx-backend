import { Module } from '@nestjs/common';
import { TecnicoService } from './tecnico.service';
import { TecnicoController } from './tecnico.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [TecnicoController],
  providers: [TecnicoService, PrismaService],
})
export class TecnicoModule {}
