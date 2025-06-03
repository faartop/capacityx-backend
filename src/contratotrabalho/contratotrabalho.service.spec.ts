import { Test, TestingModule } from '@nestjs/testing';
import { ContratoTrabalhoService } from './contratotrabalho.service';

describe('ContratoTrabalhoService', () => {
  let service: ContratoTrabalhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratoTrabalhoService],
    }).compile();

    service = module.get<ContratoTrabalhoService>(ContratoTrabalhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
