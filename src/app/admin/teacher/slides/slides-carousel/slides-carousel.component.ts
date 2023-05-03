import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IListItemClickEventArgs,
  ISlideEventArgs,
  IgxCarouselComponent,
  IgxListComponent,
} from 'igniteui-angular';
import { ISlide, SlideService } from 'src/app/shared/services/slide';

@Component({
  selector: 'app-slides-carousel',
  templateUrl: './slides-carousel.component.html',
  styleUrls: ['./slides-carousel.component.scss'],
})
export class SlidesCarouselComponent implements OnInit {
  @Input() public lessonId: string;

  @ViewChild(IgxCarouselComponent, { static: true })
  public carousel?: IgxCarouselComponent;

  @ViewChild(IgxListComponent, { static: true })
  public list?: IgxListComponent;

  addSlideMutation = this.slideService.addSlideForLesson();
  updateSlideMutation = this.slideService.updateSlideForLesson();

  public slides: ISlide[] = [];
  public currentIndex = 0;
  public currentSlide?: ISlide;

  constructor(private slideService: SlideService) {
    this.lessonId = '';
  }

  setCurrentSlide() {
    this.currentSlide = this.slides[this.currentIndex];
  }

  public ngOnInit() {
    this.slideService
      .fetchSlidesForLesson(this.lessonId)
      .result$.subscribe((slidesFetch) => {
        if (slidesFetch.isSuccess) {
          this.slides = slidesFetch.data;
        }
      });

    this.list?.itemClicked.subscribe((args: IListItemClickEventArgs) => {
      this.currentIndex = args.item.index;
      this.setCurrentSlide();
      this.carousel?.select(this.carousel.get(this.currentIndex));
    });

    this.carousel?.slideChanged.subscribe((args: ISlideEventArgs) => {
      this.currentIndex = args.slide.index;
    });
  }

  onAddNewSlide() {
    let slide: ISlide = {
      id: '',
      order: 0,
      type: '',
      delta: `{"ops":[{"insert":"Title hero ${this.slides?.length}"},{"attributes":{"align":"center","header":1},"insert":"\\n"},{"insert":"Example of subtext"},{"attributes":{"align":"center"},"insert":"\\n\\n\\n"},{"insert":"\\n"}]}`,
    };
    this.addSlideMutation.mutate({ slide: slide, lessonId: this.lessonId });
  }

  onChangeSlide(slide: ISlide) {
    this.updateSlideMutation.mutate({ lessonId: this.lessonId, slide: slide });
    window.location.reload();
  }
}
