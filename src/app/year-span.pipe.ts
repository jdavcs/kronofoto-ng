import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearSpan'
})
export class YearSpanPipe implements PipeTransform {
  transform(yearMin: number, yearMax: number): string {
    return (yearMin === yearMax) ? `${yearMin}` : `${yearMin} - ${yearMax}`;
  }
}
