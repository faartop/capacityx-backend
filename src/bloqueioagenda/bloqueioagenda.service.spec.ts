import { Test, TestingModule } from '@nestjs/testing';
import { BloqueioAgendaService } from './bloqueioagenda.service';

describe('BloqueioAgendaService', () => {
  let service: BloqueioAgendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloqueioAgendaService],
    }).compile();

    service = module.get<BloqueioAgendaService>(BloqueioAgendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
