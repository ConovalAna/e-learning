import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-licenta';

  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
