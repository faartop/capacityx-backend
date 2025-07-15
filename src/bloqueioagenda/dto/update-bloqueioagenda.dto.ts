import { PartialType } from '@nestjs/mapped-types';
import { CreateBloqueioAgendaDto } from './create-bloqueioagenda.dto';

export class UpdateBloqueioAgendaDto extends PartialType(CreateBloqueioAgendaDto) {}
