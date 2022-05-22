import { CreateDto, Dto, ResetDto, UpdateDto } from '@webservicetp1/common/resource/core';

export const resourceTotoPath = 'totos';

// eslint-disable @typescript-eslint/no-empty-interface
export interface TotoDto extends Dto {
}

export type TotoCreateDto = CreateDto<TotoDto>;
export type TotoUpdateDto = UpdateDto<TotoDto>;
export type TotoResetDto = ResetDto<TotoDto>;
