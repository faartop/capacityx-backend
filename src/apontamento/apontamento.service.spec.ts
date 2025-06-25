import { Test, TestingModule } from '@nestjs/testing';
import { ApontamentoService } from './apontamento.service';

describe('ApontamentoService', () => {
  let service: ApontamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApontamentoService],
    }).compile();

    service = module.get<ApontamentoService>(ApontamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
