import { Test, TestingModule } from '@nestjs/testing';
import { ContratoTrabalhoController } from './contratotrabalho.controller';
import { ContratoTrabalhoService } from './contratotrabalho.service';

describe('ContratoTrabalhoController', () => {
  let controller: ContratoTrabalhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratoTrabalhoController],
      providers: [ContratoTrabalhoService],
    }).compile();

    controller = module.get<ContratoTrabalhoController>(ContratoTrabalhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
