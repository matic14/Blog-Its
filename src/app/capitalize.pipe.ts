import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    const firstChar = value.substring(0 , 1);
    const allOtherChar = value.substring(1 , value.length);

    const newValue = firstChar.toUpperCase() + allOtherChar.toLowerCase();
    return newValue;
  }

}
