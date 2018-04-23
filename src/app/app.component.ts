import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isFluid: boolean = false;
  newLayout: string = 'fluid';

  ngOnInit() {}

  switchLayout() {
    if (this.isFluid) {
      this.isFluid = false;
      this.newLayout = 'fluid';
    }
    else {
      this.isFluid = true;
      this.newLayout = 'fixed';
    }
  }
}
