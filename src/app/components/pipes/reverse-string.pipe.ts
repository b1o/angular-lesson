import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseString'
})
export class ReverseStringPipe implements PipeTransform {

  transform(value: string, ...args: [number, string, number]): string {
    let newString: string = '';
    const lengthToReverse  = args[2];

    for(let i = value.length - 1; i >= lengthToReverse; i--)   {
      newString += value.charAt(i)
    }

    return newString;


  }

}

