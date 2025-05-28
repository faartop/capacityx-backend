import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaPaiService } from './categoriapai.service';

describe('CategoriaPaiService', () => {
  let service: CategoriaPaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaPaiService],
    }).compile();

    service = module.get<CategoriaPaiService>(CategoriaPaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
