import { PartialType } from '@nestjs/mapped-types';
import { CreateContratoTrabalhoDto } from './create-contratotrabalho.dto';

export class UpdateContratoTrabalhoDto extends PartialType(CreateContratoTrabalhoDto) {}
