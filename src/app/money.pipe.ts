import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  transform(value: number): string {
    const tmp = (Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
    const token = tmp.split('.');
    const dec = token[1];
    let ful = token[0];
    if (ful.length >= 4) {
      ful = ful.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return ful + '.' + dec;
  }
}
