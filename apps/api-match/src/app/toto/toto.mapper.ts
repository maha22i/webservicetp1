import { ApiAbstractMapper } from '@webservicetp1/api/core/abstract';
import { Log } from '@webservicetp1/api/core/logging';
import { Injectable, Logger } from '@nestjs/common';
import { TotoCreateDto, TotoDto, TotoResetDto, TotoUpdateDto } from './toto.dto';
import { TotoEntity, TotoEntityWithId } from './toto.entity';

@Injectable()
export class TotoMapper extends ApiAbstractMapper<TotoEntity, TotoDto> {

  protected logger = new Logger(TotoMapper.name);

  @Log()
  mapEntityToDto(document: TotoEntityWithId): TotoDto {
    return {
      id: document.id,
    };
  }

  @Log()
  mapCreateDtoToEntity(dto: TotoCreateDto): TotoEntity {
    return {
    };
  }

  @Log()
  mapUpdateDtoToEntity(dto: TotoUpdateDto): TotoEntityWithId {
    return {
      id: dto.id,
    };
  }

  @Log()
  mapResetDtoToEntity(dto: TotoResetDto): TotoEntityWithId {
    return {
      id: dto.id,
    };
  }
}
