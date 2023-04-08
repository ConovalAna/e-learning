import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss']
})
export class AvatarImageComponent implements OnInit {
  @Input() isEditable?: boolean;
  @Output() onChangeEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() shape: string;
  @Input() imageURL?: string;

  fileName = '';
  uploadForm: FormGroup;

  public storage: Storage = inject(Storage);


  constructor(public fb: FormBuilder) {
    // Reactive Form
    this.imageURL = this.imageURL ?? "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
    this.shape = "rounded-circle";
  }

  ngOnInit(): void {
  }

  uploadImagess(file: File) {
    if (file) {
      const storageRef = ref(this.storage, file.name);
      uploadBytesResumable(storageRef, file);
      getDownloadURL(ref(this.storage, file.name)).then((url) => {
        console.log(url);
      })
        .catch((error) => {
          // Handle any errors
        });
    }
  }

  onFileSelected(event: any) {
    const inputElement = (event.target as HTMLInputElement);
    if (!inputElement.files) return;
    const file = inputElement.files[0]
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
    this.uploadImagess(file);
  }
}
