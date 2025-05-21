import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoCategoriaDto } from './create-projetocategoria.dto';

export class UpdateProjetoCategoriaDto extends PartialType(CreateProjetoCategoriaDto) {}
