import {
  PaginatedItems,
  PaginationMappedParams,
} from '@webservicetp1/api/core/pagination';
import { PaginationMappedParamsPipe } from '@webservicetp1/api/validation/pagination';

import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { map, mapTo, Observable } from 'rxjs';
import {
  EquipeCreateType,
  EquipePageType,
  EquipeType,
  EquipeUpdateType,
  MatchType,
  PaginationParamsType,
  RemoveStatusType,
} from './equipe.type';
import { EquipeDto } from '@webservicetp1/common/resource/equipe';
import { MatchService } from '@webservicetp1/api/service/match';
import { EquipeService } from '@webservicetp1/api/service/equipe';
import { MatchDto } from '@webservicetp1/common/resource/match';

@Resolver(() => EquipeType)
export class EquipeResolver {
  constructor(
    private readonly EquipeService: EquipeService,
    private readonly matchService: MatchService
  ) {}

  @Mutation(() => EquipeType)
  createEquipe(
    @Args('createEquipeInput') createEquipeInput: EquipeCreateType
  ): Observable<EquipeDto> {
    return this.EquipeService.create(createEquipeInput);
  }

  @Query(() => EquipePageType, { name: 'equipe' })
  findAll(
    @Args({ type: () => PaginationParamsType }, PaginationMappedParamsPipe)
    params: PaginationMappedParams
  ): Observable<PaginatedItems<EquipeDto>> {
    return this.EquipeService.findAll(params.skip, params.limit);
  }

  @ResolveField('match', () => [MatchType])
  getMatch(@Parent() equipe: EquipeDto): Observable<MatchDto[]> {
    return this.matchService.findAll(0, 2).pipe(map(({ items }) => items));
  }

  @Query(() => EquipeType, { name: 'equipe' })
  findOne(@Args('id') id: string): Observable<EquipeDto> {
    return this.EquipeService.findOne(id);
  }

  @Mutation(() => EquipeType)
  updateEquipe(
    @Args('updateEquipeInput') updateEquipeInput: EquipeUpdateType
  ): Observable<EquipeDto> {
    return this.EquipeService.update(updateEquipeInput);
  }

  @Mutation(() => RemoveStatusType)
  removeEquipe(@Args('id') id: string): Observable<RemoveStatusType> {
    return this.EquipeService.remove(id).pipe(mapTo({ ok: true }));
  }
}
