import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  downloadFile() {
    const fileName = 'help.pdf';

    const filePath = `assets/doc/${fileName}`;
    fetch(filePath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();

        window.URL.revokeObjectURL(url);
      });
  }
}
//02voc.pdf
