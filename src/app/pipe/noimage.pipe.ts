import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(image: string): unknown {
    return image == null ? 'assets/img/noimage.png' : image;
  }

}
