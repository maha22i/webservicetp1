import { Test, TestingModule } from '@nestjs/testing';
import { EquipeResolver } from './equipe.resolver';
describe('EquipeResolver', () => {
  let resolver: EquipeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipeResolver],
    }).compile();

    resolver = module.get<EquipeResolver>(EquipeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
