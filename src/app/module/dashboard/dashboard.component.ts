import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { customerDetails } from '../../models/customer';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// export interface customerDetails {
//   id: number;
//   name: string;
//   state: string;
//   city: string;
//   postal: number;
// }

// const ELEMENT_DATA: customerDetails[] = [
//   {
//     id: 1,
//     name: 'umesh',
//     state: 'maharashtra',
//     city: 'nashik',
//     postal: 422008
//   },
//   {
//     id: 2,
//     name: 'dfsdf',
//     state: 'maharashtra',
//     city: 'nashik',
//     postal: 422008
//   },
//   {
//     id: 3,
//     name: 'rahul',
//     state: 'maharashtra',
//     city: 'nashik',
//     postal: 422008
//   },
// ]

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  private http = inject(HttpClient);

  displayedColumns: string[] = ['id', 'name', 'state', 'city', 'postal'];
  dataSource = new MatTableDataSource<customerDetails>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {
    this.loadCustomerData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadCustomerData() {
    this.http.get<customerDetails[]>('assets/customerDetails.json').subscribe({
      next: (data: customerDetails[]) => { // Explicitly define data type
        this.dataSource.data = data; // No need to map if no transformation needed
      },
      error: (error) => {
        console.error('Error loading product data:', error);
      }
    });
  }
}
