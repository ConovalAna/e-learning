import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Observable, catchError, map, merge, startWith, switchMap } from 'rxjs';
import {
  CourseService,
  ICourse,
  IUserCourseStatistic,
  UserCourseService,
} from 'src/app/shared/services/course';
import { UserFacade } from 'src/app/state/users';

@Component({
  selector: 'app-students-subscription-table',
  templateUrl: './students-subscription-table.component.html',
  styleUrls: ['./students-subscription-table.component.scss'],
})
export class StudentsSubscriptionTableComponent implements AfterViewInit {
  private _currentCourseId?: string;
  private _courseStatistics: IUserCourseStatistic[] = [];

  displayedColumns: string[] = [
    'email',
    'subscribed',
    'progress',
    'completed_chapters',
  ];
  data: UserCourseStatistics[] = [];

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  @Input()
  get currentCourseId(): string | undefined {
    return this._currentCourseId;
  }
  set currentCourseId(currentCourseId: string | undefined) {
    this._currentCourseId = currentCourseId;
    console.log(currentCourseId);
    if (currentCourseId)
      this.userCourseService
        .getUserCourseStatistics(currentCourseId)
        .result$.subscribe((result) => {
          this._courseStatistics = result.data ?? [];
          if (result?.data?.length) {
            this.userService
              .searchUsersByIds(result.data.map((d) => d.id))
              .subscribe((users) => {
                this.data = result.data.map((d) => {
                  return {
                    completed_chapters: d.totalPassedChapter,
                    email:
                      users.find((user) => user.uid === d.id)?.email ?? d.id,
                    progress: d.progress,
                    subscribed_at: d.joinDate,
                  };
                });
              });
          } else {
            this.data = [];
          }
        });
  }

  constructor(
    private userCourseService: UserCourseService,
    private userService: UserFacade
  ) {}

  ngAfterViewInit() {}
}

export interface UserCourseStatistics {
  subscribed_at: string;
  completed_chapters: number;
  progress: number;
  email: string;
}
