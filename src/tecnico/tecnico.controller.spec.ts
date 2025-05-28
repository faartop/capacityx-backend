import { Test, TestingModule } from '@nestjs/testing';
import { TecnicoController } from './tecnico.controller';
import { TecnicoService } from './tecnico.service';

describe('TecnicoController', () => {
  let controller: TecnicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TecnicoController],
      providers: [TecnicoService],
    }).compile();

    controller = module.get<TecnicoController>(TecnicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
