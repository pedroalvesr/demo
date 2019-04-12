import { Component, OnInit } from '@angular/core';

import * as JSZip from 'jszip';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  baixar() {
    const jszip = new JSZip();
    return jszip.loadAsync().then((zip) => {
      // Do something with the zipcontent
      });
  }

  public unzip(file) {
    const jszip = new JSZip();
    jszip.loadAsync(file).then((zip) => {
      Object.keys(zip).forEach((filename) => {
        zip[filename].async('blob').then((blobFile) => {
          // Do something with the blob file
        });
      });
    });
  }

}
