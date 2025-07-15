import { Test, TestingModule } from '@nestjs/testing';
import { BloqueioAgendaController } from './bloqueioagenda.controller';
import { BloqueioAgendaService } from './bloqueioagenda.service';

describe('BloqueioAgendaController', () => {
  let controller: BloqueioAgendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqueioAgendaController],
      providers: [BloqueioAgendaService],
    }).compile();

    controller = module.get<BloqueioAgendaController>(BloqueioAgendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
