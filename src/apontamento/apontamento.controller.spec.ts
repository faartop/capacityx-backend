import { Test, TestingModule } from '@nestjs/testing';
import { ApontamentoController } from './apontamento.controller';
import { ApontamentoService } from './apontamento.service';

describe('ApontamentoController', () => {
  let controller: ApontamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApontamentoController],
      providers: [ApontamentoService],
    }).compile();

    controller = module.get<ApontamentoController>(ApontamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
