import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-list',
  styleUrls: ['./drag-list.component.scss'],
  templateUrl: './drag-list.component.html',
})
export class DragListComponent {
  public dragIconId!: number;
  public dropTileId!: number;
  public icons = [
    {
      id: 0,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/profile.png',
    },
    {
      id: 1,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/calendar.png',
    },
    {
      id: 2,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/mail.png',
    },
    {
      id: 3,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/photos.png',
    },
    {
      id: 4,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/videos.png',
    },
    {
      id: 5,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/cloud.png',
    },
    {
      id: 6,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/map.png',
    },
    {
      id: 7,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/contacts.png',
    },
    {
      id: 8,
      url: 'https://www.infragistics.com/angular-demos-lob/assets/images/drag-drop/chat.png',
    },
  ];

  public onIconDropped(ev: any) {
    ev.drag.dropFinished();
  }

  public onEnterHandler(ev: any): void {
    this.dropTileId = parseInt(ev.owner.element.nativeElement.id, 10);
    // the event gets raised immediately, but we want to swap only when we drag over another icon
    if (this.dragIconId === this.dropTileId) {
      return;
    }
    const dragIndex = this.icons.findIndex(
      (iconObj) => iconObj.id === this.dragIconId
    );
    const dropIndex = this.icons.findIndex(
      (iconObj) => iconObj.id === this.dropTileId
    );
    this.swapIcons(dragIndex, dropIndex);
  }

  public dragStartHandler(id: number): void {
    this.dragIconId = id;
  }

  public dragEndHandler(dragRef: HTMLElement) {
    dragRef.style.visibility = 'visible';
  }

  public ghostCreateHandler(dragRef: HTMLElement) {
    dragRef.style.visibility = 'hidden';
  }

  private swapIcons(dragIndex: number, dropIndex: number) {
    const tempObj = this.icons[dragIndex];
    this.icons.splice(dragIndex, 1);
    this.icons.splice(dropIndex, 0, tempObj);
  }
}
