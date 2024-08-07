import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReplaySubject, switchMap, EMPTY, takeUntil } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';
import { UsersService } from '../../services/users.service';
import { Users, User } from '../../models/users';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnDestroy {
  users: Users[] = [];
  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  private readonly userService = inject(UsersService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly dialog = inject(MatDialog);
  private destroyed$ = new ReplaySubject<void>(1);

  displayedColumns: string[] = ['name', 'age', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  isLoading = false;
  hasError = false;

  constructor() {
    this.getUserData();
  }

  setDataSourceAttributes() {
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

  deleteConfirm(rowData: User) {
    const dialogRef = this.dialog.open(UsersDeleteComponent, {
      width: '250px',
      data: rowData,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            return this.userService
              .deleteUser(rowData._id)
              .pipe(switchMap(async () => this.getUserData()));
          } else {
            return EMPTY;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSnackBar('User data deleted successfully.');
        },
        error: (error) => {
          this.snackbarService.showSnackBar('Unable to delete User data.');
          console.error('Error occurred while deleting User data: ', error);
        },
      });
  }

  private getUserData() {
    this.isLoading = true;
    this.hasError = false;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.snackbarService.showSnackBar('Unable to fetch User data.');
        console.error('Error occurred while fetching User data: ', error);
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
