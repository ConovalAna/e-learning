import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {
  url: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.url = data;
  }
  isEditMode: boolean = false;
}
