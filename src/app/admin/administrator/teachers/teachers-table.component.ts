import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/shared/services/user';
import { UserFacade } from 'src/app/state/users';
import { TeacherAddComponent } from './teacher-add/teacher-add.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-teachers-table',
  styleUrls: ['teachers-table.component.scss'],
  templateUrl: 'teachers-table.component.html',
})
export class TeachersTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'uid',
    'displayName',
    'email',
    'role',
    'settings',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserFacade, public dialog: MatDialog) {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });
    // Create 100 users
    const users: User[] = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddLessonDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(TeacherAddComponent, {
      data: {},
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      new Promise((res) => setTimeout(res, 500)).then(() => {});
    });
  }

  deleteTeacher(teacherId: string) {
    this.userService.deleteUserFromAdmin(teacherId);
  }
}
