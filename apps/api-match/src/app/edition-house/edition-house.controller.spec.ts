import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, of } from 'rxjs';
import { EditionHouseDto } from './edition-house.dto';
import { EditionHouseController } from './edition-house.controller';
import { EditionHouseService } from './edition-house.service';

describe('EditionHouseController', () => {
  let controller: EditionHouseController;
  let serviceMock: Partial<EditionHouseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [EditionHouseController],
    })
      .useMocker((token) => {
        if (token === EditionHouseService) {
          serviceMock = {
            findAll: jest
              .fn<
                Observable<PaginatedItems<EditionHouseDto>>,
                [number, number]
              >()
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

    controller = module.get<EditionHouseController>(EditionHouseController);
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
