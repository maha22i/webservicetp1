import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { TotoDto } from './toto.dto';
import { TotoController } from './toto.controller';
import { TotoService } from './toto.service';

describe('TotoController', () => {
  let controller: TotoController;
  let serviceMock: Partial<TotoService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [TotoController]
    })
      .useMocker(token => {
        if (token === TotoService) {
          serviceMock = {
            findAll: jest.fn<Observable<PaginatedItems<TotoDto>>, [number, number]>().mockReturnValue(of({
              items: [],
              count: 13
            }))
          };
          return serviceMock;
        }
      })
      .compile();

    controller = module.get<TotoController>(TotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an Observable', () => {
      const skip = 0;
      const limit = 10;

      const result = controller.findAll({ skip, limit });

      expect(result).toBeInstanceOf(Observable);
    })
    it('should call service', done => {
      const skip = 0;
      const limit = 10;

      const result = controller.findAll({ skip, limit });

      result.subscribe(() => {
        expect(serviceMock.findAll).toBeCalledTimes(1);
        done();
      })
    })
  });
});
