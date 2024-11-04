import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products-master',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './products-master.component.html',
  styleUrls: ['./products-master.component.css']
})
export class ProductsMasterComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  private http = inject(HttpClient);

  displayedColumns: string[] = ['id', 'name', 'price', 'purchaseDate', 'quantity'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private dialog: MatDialog) {
    this.loadProductData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadProductData() {
    this.http.get<Product[]>('assets/productDetails.json').subscribe({
      next: (data) => {
        this.dataSource.data = data.map(item => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate)
        }));
      },
      error: (error) => {
        console.error('Error loading product data:', error);
      }
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '80%',  // Adjust width as needed
      disableClose: true // Prevents closing on outside click
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        // Refresh data after adding a product, if necessary
        this.loadProductData();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
