import { Test, TestingModule } from '@nestjs/testing';
import { ItemProjetoCategoriaController } from './itemprojetocategoria.controller';
import { ItemProjetoCategoriaService } from './itemprojetocategoria.service';

describe('ItemProjetoCategoriaController', () => {
  let controller: ItemProjetoCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemProjetoCategoriaController],
      providers: [ItemProjetoCategoriaService],
    }).compile();

    controller = module.get<ItemProjetoCategoriaController>(ItemProjetoCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
