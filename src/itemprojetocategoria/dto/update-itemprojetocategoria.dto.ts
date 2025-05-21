import { PartialType } from '@nestjs/mapped-types';
import { CreateItemProjetoCategoriaDto } from './create-itemprojetocategoria.dto';

export class UpdateItemProjetoCategoriaDto extends PartialType(CreateItemProjetoCategoriaDto) {}
