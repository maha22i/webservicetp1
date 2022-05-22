import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@webservicetp1/common/resource/core';

export const resourceEditionHousePath = 'edition-houses';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditionHouseDto extends Dto {}

export type EditionHouseCreateDto = CreateDto<EditionHouseDto>;
export type EditionHouseUpdateDto = UpdateDto<EditionHouseDto>;
export type EditionHouseResetDto = ResetDto<EditionHouseDto>;
