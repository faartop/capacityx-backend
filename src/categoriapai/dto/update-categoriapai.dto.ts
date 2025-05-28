import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaPaiDto } from './create-categoriapai.dto';

export class UpdateCategoriaPaiDto extends PartialType(CreateCategoriaPaiDto) {}
