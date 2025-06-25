import { PartialType } from '@nestjs/mapped-types';
import { CreateApontamentoDto } from './create-apontamento.dto';

export class UpdateApontamentoDto extends PartialType(CreateApontamentoDto) {}
