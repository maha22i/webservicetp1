import { ApiAbstractMapper } from '@webservicetp1/api/core/abstract';
import { Log } from '@webservicetp1/api/core/logging';
import { Injectable, Logger } from '@nestjs/common';
import {
  EditionHouseCreateDto,
  EditionHouseDto,
  EditionHouseResetDto,
  EditionHouseUpdateDto,
} from './edition-house.dto';
import {
  EditionHouseEntity,
  EditionHouseEntityWithId,
} from './edition-house.entity';

@Injectable()
export class EditionHouseMapper extends ApiAbstractMapper<
  EditionHouseEntity,
  EditionHouseDto
> {
  protected logger = new Logger(EditionHouseMapper.name);

  @Log()
  mapEntityToDto(document: EditionHouseEntityWithId): EditionHouseDto {
    return {
      id: document.id,
    };
  }

  @Log()
  mapCreateDtoToEntity(dto: EditionHouseCreateDto): EditionHouseEntity {
    return {};
  }

  @Log()
  mapUpdateDtoToEntity(dto: EditionHouseUpdateDto): EditionHouseEntityWithId {
    return {
      id: dto.id,
    };
  }

  @Log()
  mapResetDtoToEntity(dto: EditionHouseResetDto): EditionHouseEntityWithId {
    return {
      id: dto.id,
    };
  }
}
