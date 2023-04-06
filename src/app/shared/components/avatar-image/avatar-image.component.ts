import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  }
}
