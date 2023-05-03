import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { UseIsFetching } from '@ngneat/query';
import {
  IDragBaseEventArgs,
  IDragMoveEventArgs,
  IListItemClickEventArgs,
  ISlideEventArgs,
  IgxCarouselComponent,
  IgxDragDirective,
  IgxDragLocation,
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

  public isFetchingPosts$ = inject(UseIsFetching)([
    'slides',
    '2aa2710d5d6941dd8ceb742e5cca6f77',
  ]);

  @ViewChild(IgxListComponent, { static: true })
  public list?: IgxListComponent;

  @ViewChildren('dragDirRef', { read: IgxDragDirective })
  public dragDirs!: QueryList<IgxDragDirective>;

  @ViewChild('listContainer', { read: ElementRef })
  public listContainer: ElementRef | undefined;

  public newIndex: number | null = null;
  public animationDuration = 0.3;
  private listItemHeight = 160;

  addSlideMutation = this.slideService.addSlideForLesson();
  updateSlideMutation = this.slideService.updateSlideForLesson();
  chageSlideOrderMutation = this.slideService.changeSlideOrderForLesson();

  public slides$: ISlide[] = [];
  public currentIndex = 0;
  public currentSlide?: ISlide;

  constructor(private slideService: SlideService) {
    this.lessonId = '';
  }

  setCurrentSlide() {
    this.currentSlide = this.slides$[this.currentIndex];
  }

  updateSlides(newSlides: ISlide[]) {
    this.slides$ = newSlides;
    console.log('update');
  }

  public ngOnInit() {
    this.slideService
      .fetchSlidesForLesson(this.lessonId)
      .result$.subscribe((slidesFetch) => {
        if (slidesFetch.isSuccess) {
          this.updateSlides(slidesFetch.data);
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
      delta: `{"ops":[{"insert":"Title hero ${this.slides$?.length}"},{"attributes":{"align":"center","header":1},"insert":"\\n"},{"insert":"Example of subtext"},{"attributes":{"align":"center"},"insert":"\\n\\n\\n"},{"insert":"\\n"}]}`,
    };
    this.addSlideMutation.mutate({ slide: slide, lessonId: this.lessonId });
  }

  onChangeSlide(slide: ISlide) {
    this.updateSlideMutation.mutate({ lessonId: this.lessonId, slide: slide });
    window.location.reload();
  }

  public getDragDirectiveRef(id: number): IgxDragDirective | undefined {
    return this.dragDirs.find((item) => item.data.id === id);
  }

  public onDragStart(event: IDragBaseEventArgs, dragIndex: number) {
    // Record the current index as basis for moving up/down.
    this.newIndex = dragIndex;
    // Sets specific class when dragging.
    event.owner.data.dragged = true;
  }

  public onDragEnd(event: IDragBaseEventArgs, itemIndex: number) {
    if (this.newIndex !== null) {
      // When we have moved the dragged element up/down, animate it to its new location.
      const moveDown = this.newIndex > itemIndex;
      // If the new position is below add the height moved down, otherwise subtract it.
      const prefix = moveDown ? 1 : -1;
      // The height that the new position differs from the current. We know that each item is 55px height.
      const movedHeight =
        prefix * Math.abs(this.newIndex - itemIndex) * this.listItemHeight;
      const originLocation = event.owner.originLocation;
      event.owner.transitionTo(
        new IgxDragLocation(
          originLocation.pageX,
          originLocation.pageY + movedHeight
        ),
        { duration: this.animationDuration }
      );
    } else {
      // Otherwise animate it to its original position, since it is unchanged.
      event.owner.transitionToOrigin({ duration: this.animationDuration });
    }
  }

  public onTransitioned(event: IDragBaseEventArgs, itemIndex: number) {
    // We can have other items transitioned when they move to free up space where the dragged element would be.
    if (
      event.owner.data.dragged &&
      this.newIndex != null &&
      this.newIndex !== itemIndex
    ) {
      // If the element finished transitioning is the one were dragging,
      // We can update all elements their new position in the list.
      this.shiftElements(itemIndex, this.newIndex);
      event.owner.setLocation(event.owner.originLocation);
      this.newIndex = null;
    }
    // Disables the specific class when dragging.
    event.owner.data.dragged = false;
  }

  public onDragMove(event: IDragMoveEventArgs, itemIndex: number) {
    const containerPosY =
      this.listContainer?.nativeElement.getBoundingClientRect().top;
    // Relative position of the dragged element to the list container.
    const relativePosY = event.nextPageY - containerPosY;

    let newIndex = Math.floor(relativePosY / this.listItemHeight);
    newIndex =
      newIndex < 0
        ? 0
        : newIndex >= this.slides$.length
        ? this.slides$.length - 1
        : newIndex;
    if (newIndex === this.newIndex) {
      // If the current new index is unchanged do nothing.
      return;
    }

    const movingDown = newIndex > itemIndex;
    if (this.slides$ && this.newIndex)
      if (
        (movingDown && newIndex > this.newIndex) ||
        (!movingDown && newIndex < this.newIndex && newIndex !== itemIndex)
      ) {
        // If we are moving the dragged element down and the new index is bigger than the current
        // this means that the element we are stepping into is not shifted up and should be shifted.
        // Same if we moving the dragged element up and the new index is smaller than the current.
        const elementToMove = this.getDragDirectiveRef(
          this.slides$[newIndex].order
        );
        const currentLocation = elementToMove?.location;
        const prefix = movingDown ? -1 : 1;
        elementToMove?.transitionTo(
          new IgxDragLocation(
            currentLocation?.pageX,
            currentLocation?.pageY ?? 0 + prefix * this.listItemHeight
          ),
          { duration: this.animationDuration }
        );
      } else {
        // Otherwise if are moving up but the new index is still bigger than the current, this means that
        // the item we are stepping into is already shifted and should be returned to its original position.
        // Same if we are moving down and the new index is still smaller than the current.
        const elementToMove = this.getDragDirectiveRef(
          this.slides$[this.newIndex].order
        );
        elementToMove?.transitionToOrigin({ duration: this.animationDuration });
      }

    this.newIndex = newIndex;
  }

  private shiftElements(draggedIndex: number, targetIndex: number) {
    // Move the dragged element in DOM to the new position.
    const movedElem = this.slides$.splice(draggedIndex, 1);
    this.slides$.splice(targetIndex, 0, movedElem[0]);

    this.dragDirs.forEach((dir) => {
      if (this.slides$[targetIndex].order !== dir.data.id) {
        // Reset each element its location since it will be repositioned in the DOM except the element we drag.
        dir.setLocation(dir.originLocation);
        dir.data.shifted = false;
      }
    });

    this.slides$.forEach((slide, index) => {
      this.chageSlideOrderMutation
        .mutate({ slideId: slide.id, lessonId: this.lessonId, order: index })
        .then();
    });
  }
}
