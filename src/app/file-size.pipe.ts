import { Pipe, PipeTransform } from '@angular/core';

//adapted from githubgist by @JonCarmull
@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  private units = ['bytes', 'KB', 'MB', 'GB'];

  transform(bytes: number=0, precision: number=2): string {
    let i = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      i++;
    }
    return bytes.toFixed(+precision) + ' ' + this.units[i];
  }
}
