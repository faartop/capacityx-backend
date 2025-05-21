import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoCategoriaService } from './projetocategoria.service';

describe('ProjetoCategoriaService', () => {
  let service: ProjetoCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetoCategoriaService],
    }).compile();

    service = module.get<ProjetoCategoriaService>(ProjetoCategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
