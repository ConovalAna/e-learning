import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { QuillEditorComponent } from 'src/app/admin/shared/quill-editor/quill-editor.component';
import { ISlide, SlideService } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-slide-add',
  templateUrl: './slide-add.component.html',
  styleUrls: ['./slide-add.component.scss'],
})
export class SlideAddComponent implements OnInit {
  @Input() slide?: ISlide;
  @Input() lessonId: string = '';
  @Input() chapterId: string = '';

  @Output() slideChange: EventEmitter<ISlide> = new EventEmitter<ISlide>();
  @ViewChild(QuillEditorComponent) quillChild?: QuillEditorComponent;

  deleteSlideMutation = this.slideService.deleteSlideForLesson();

  ngOnInit(): void { }

  constructor(private slideService: SlideService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slide']) {
      this.quillChild?.setContents(changes['slide']?.currentValue.delta);
    }
  }

  ngAfterViewInit() {
    // child is set
    if (this.slide) {
      this.quillChild?.setContents(this.slide.delta);
    }
  }

  onSave() {
    this.slide!.delta = JSON.stringify(this.quillChild?.getContents());
    this.slideChange?.emit(this.slide);
  }

  cancelChanges() { }

  deleteSlide() {
    if (this.slide)
      this.deleteSlideMutation.mutate({
        slide: this.slide,
        lessonId: this.lessonId,
        chapterId: this.chapterId
      });
  }
}
