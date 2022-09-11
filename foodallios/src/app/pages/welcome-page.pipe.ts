import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'welcomePage'
})
export class WelcomePagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
