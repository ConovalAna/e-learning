import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  @Input() requiredFileType: string = 'pdf';
  @Input() path: string = 'pdf';
  @Input() fileName: string = '';

  @Output() onChangeUrlEvent: EventEmitter<string> = new EventEmitter<string>();

  public storage: Storage = inject(Storage);

  constructor() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      const storageRef = ref(this.storage, this.path + '/' + file.name);
      var uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.then(() => {
        getDownloadURL(ref(this.storage, this.path + '/' + file.name))
          .then((url) => {
            if (url) this.onChangeUrlEvent.emit(url);
          })
          .catch((error) => {
            // Handle any errors
          });
      });
    }
  }
}
