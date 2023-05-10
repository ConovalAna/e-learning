import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss'],
})
export class AvatarImageComponent implements OnInit {
  @Input() isEditable?: boolean;
  @Output() onChangeUrlEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() shape: string;
  @Input() imageURL?: string;

  fileName = '';
  uploadForm: FormGroup;

  public storage: Storage = inject(Storage);

  constructor(public fb: FormBuilder) {
    // Reactive Form
    this.imageURL =
      this.imageURL ??
      'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg';
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: [''],
    });
    this.shape = 'rounded-circle';
  }

  ngOnInit(): void {
    if (!this.imageURL) {
      this.imageURL =
        'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg';
    }
  }

  uploadImagess(file: File) {
    if (file) {
      const storageRef = ref(this.storage, file.name);
      uploadBytesResumable(storageRef, file);
      getDownloadURL(ref(this.storage, file.name))
        .then((url) => {
          if (url) this.onChangeUrlEvent.emit(url);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }

  onFileSelected(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files) return;
    const file = inputElement.files[0];
    this.uploadForm.patchValue({
      avatar: file,
    });
    this.uploadForm.get('avatar')?.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.uploadImagess(file);
  }
}
