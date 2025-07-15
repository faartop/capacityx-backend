import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseISODatePipe implements PipeTransform {
  transform(value: any): Date | undefined {
    if (!value) {
      return undefined;
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Formato de data inválido para competência');
    }

    return date;
  }
}