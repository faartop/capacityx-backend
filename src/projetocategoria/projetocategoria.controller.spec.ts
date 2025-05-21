import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoCategoriaController } from './projetocategoria.controller';
import { ProjetoCategoriaService } from './projetocategoria.service';

describe('ProjetoCategoriaController', () => {
  let controller: ProjetoCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetoCategoriaController],
      providers: [ProjetoCategoriaService],
    }).compile();

    controller = module.get<ProjetoCategoriaController>(ProjetoCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
