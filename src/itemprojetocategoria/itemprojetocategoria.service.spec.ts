import { Test, TestingModule } from '@nestjs/testing';
import { ItemProjetoCategoriaService } from './itemprojetocategoria.service';

describe('ItemProjetoCategoriaService', () => {
  let service: ItemProjetoCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemProjetoCategoriaService],
    }).compile();

    service = module.get<ItemProjetoCategoriaService>(ItemProjetoCategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
