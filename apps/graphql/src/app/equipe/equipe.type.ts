import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { PaginationParams } from '@webservicetp1/common/resource/core';
import {
  ObjectType,
  Field,
  Int,
  IntersectionType,
  PickType,
  PartialType,
  OmitType,
  InputType,
  ArgsType,
} from '@nestjs/graphql';
import {
  EquipeCreateDto,
  EquipeDto,
  EquipeUpdateDto,
} from '@webservicetp1/common/resource/equipe';
import { MatchDto } from '@webservicetp1/common/resource/match';

@ObjectType('Match')
export class MatchType implements MatchDto {
  @Field() id: string;
  @Field() Nom: string;
  @Field() Date: string;
  @Field() Resultat: string;
}

@ObjectType('EquipePage')
export class EquipePageType implements PaginatedItems<EquipeDto> {
  @Field(() => Int) count: number;
  @Field(() => [EquipeType]) items: EquipeDto[];
  @Field(() => [MatchType]) match: MatchDto[];
}

@ObjectType('Equipe')
export class EquipeType implements EquipeDto {
  @Field() id: string;
  @Field() NomEquipe: string;
  @Field() NomEquipeDomicile: string;
  @Field() NomEquipeExterieur: string;
}

@ObjectType('RemoveStatus')
export class RemoveStatusType {
  @Field() ok: boolean;
}

@InputType('EquipeCreate')
export class EquipeCreateType
  extends OmitType(EquipeType, ['id'], InputType)
  implements EquipeCreateDto
{
  NomEquipe: string;
  NomEquipeDomicile: string;
  NomEquipeExterieur: string;
}

@InputType('EquipeUpdate')
export class EquipeUpdateType
  extends IntersectionType(
    PickType(EquipeType, ['id']),
    PartialType(EquipeType),
    InputType
  )
  implements EquipeUpdateDto {}

@ArgsType()
export class PaginationParamsType implements PaginationParams {
  @Field(() => Int) page: number;
  @Field(() => Int) size: number;
}
