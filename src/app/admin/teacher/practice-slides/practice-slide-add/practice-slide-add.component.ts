import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { QuillEditorComponent } from 'src/app/admin/shared/quill-editor/quill-editor.component';
import {
  AnswerType,
  IPracticeSlide,
  SlideService,
} from 'src/app/shared/services/slide';

interface ResponseType {
  value: AnswerType;
  viewValue: string;
  completed: boolean;
}

@Component({
  selector: 'app-practice-slide-add',
  templateUrl: './practice-slide-add.component.html',
  styleUrls: ['./practice-slide-add.component.scss'],
})
export class PracticeSlideAddComponent {
  @Input() slide?: IPracticeSlide;
  @Input() practiceId: string = '';

  @Output() slideChange: EventEmitter<IPracticeSlide> =
    new EventEmitter<IPracticeSlide>();
  @ViewChild(QuillEditorComponent) quillChild?: QuillEditorComponent;

  selectedAnswerType: AnswerType = AnswerType.One;
  selectedSingleAnswer: string = '';
  value = 'Clear me';
  answers: { value: string; completed: boolean }[] = [
    { value: 'Apple', completed: true },
    { value: 'Pear', completed: false },
  ];
  hasAnswers = true;
  modelIsSetted = false;

  answerTypeOptions: ResponseType[] = [
    { value: AnswerType.One, viewValue: 'Single response', completed: false },
    { value: AnswerType.Multi, viewValue: 'Multi response', completed: false },
  ];

  removeAnswer(index: number): void {
    this.answers.splice(index, 1);
  }

  deleteSlideMutation = this.slideService.deleteSlideForPractice();

  constructor(private slideService: SlideService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['slide']) {
      this.quillChild?.setContents(changes['slide']?.currentValue.delta);
      this.selectedAnswerType = changes['slide']?.currentValue.answerType;
      this.selectedSingleAnswer =
        changes['slide']?.currentValue.correctAnswers[0];
      this.answers = changes['slide']?.currentValue.answers.map(
        (value: any) => {
          return {
            value: value,
            completed: !!this.slide?.correctAnswers.find(
              (cAns) => cAns === value
            ),
          };
        }
      );
      this.modelIsSetted = true;
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
    this.slide!.answerType = this.selectedAnswerType;
    this.slide!.answers = this.answers.map((answer) => answer.value);
    if (
      this.selectedAnswerType === AnswerType.One &&
      !!this.selectedSingleAnswer
    ) {
      this.slide!.correctAnswers = [this.selectedSingleAnswer];
    } else if (this.selectedAnswerType === AnswerType.Multi) {
      this.slide!.correctAnswers = this.answers
        .filter((answer) => answer.completed)
        .map((answer) => answer.value);
    }

    this.hasAnswers = !!this.slide!.correctAnswers.length;

    if (this.hasAnswers) {
      this.slideChange?.emit(this.slide);
    }
  }

  cancelChanges() {}

  deleteSlide() {
    if (this.slide)
      this.deleteSlideMutation.mutate({
        slide: this.slide,
        practiceId: this.practiceId,
      });
  }

  addNewAnswer() {
    this.answers.push({ value: '', completed: false });
  }

  onChangeRadioValue($event: any) {
    this.selectedSingleAnswer = $event.value;
  }
}
