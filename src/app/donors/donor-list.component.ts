import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.scss']
})
export class DonorListComponent implements OnInit {
  rows;

  constructor() { 
    this.rows = [];

    for (let i=0; i<5; i++) {
      let cols = [];
      this.rows.push(cols);
      for (let j=0; j<4; j++) {
        cols.push(' ' + i + j);
      }
    }

  }

  ngOnInit() {
  }

}
