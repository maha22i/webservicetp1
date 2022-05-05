import { ApiAbstractService } from '@webservicetp1/api/core/abstract';
import { Test, TestingModule } from '@nestjs/testing';
import { ScrapService } from './scrap.service';

describe('ScrapService', () => {
  let service: ScrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScrapService,
        {
          provide: ApiAbstractService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ScrapService>(ScrapService);
  });

});
