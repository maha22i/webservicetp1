import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { EquipeController } from './equipe.controller';
import { EquipeService } from './equipe.service';
import { EquipeDto } from '@webservicetp1/common/resource/equipe';
import { CacheModule } from '@nestjs/common';

describe('EquipeController', () => {
  let controller: EquipeController;
  let serviceMock: Partial<EquipeService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [EquipeController],
    })
      .useMocker((token) => {
        if (token === EquipeService) {
          serviceMock = {
            findAll: jest
              .fn<Observable<PaginatedItems<EquipeDto>>, [number, number]>()
              .mockReturnValue(
                of({
                  items: [],
                  count: 13,
                })
              ),
          };
          return serviceMock;
        }
      })
      .compile();

    controller = module.get<EquipeController>(EquipeController);
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
    });
    it('should call service', (done) => {
      const skip = 0;
      const limit = 10;

      const result = controller.findAll({ skip, limit });

      result.subscribe(() => {
        expect(serviceMock.findAll).toBeCalledTimes(1);
        done();
      });
    });
  });
});
