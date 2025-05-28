import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaPaiController } from './categoriapai.controller';
import { CategoriaPaiService } from './categoriapai.service';

describe('CategoriaPaiController', () => {
  let controller: CategoriaPaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaPaiController],
      providers: [CategoriaPaiService],
    }).compile();

    controller = module.get<CategoriaPaiController>(CategoriaPaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
