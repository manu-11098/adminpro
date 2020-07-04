import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): string {
    if (!img)
      return `${ environment.URL }/images/${ type }/xxx`;

    if (img.indexOf('https') >= 0 )
      return img;

    return `${ environment.URL }/images/${ type }/img`;
  }

}
