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
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { Product } from '../../models/product';

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
  initialProducts: Product[] = []; // Separate array to hold productDetails.json data
  newProducts: Product[] = []; // Array for newly added products

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
        this.initialProducts = data.map(item => ({
          ...item,
          purchaseDate: new Date(item.purchaseDate)
        }));
        this.updateTableData();
      },
      error: (error) => {
        console.error('Error loading product data:', error);
      }
    });
  }

  openAddProductDialog() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '80%',  
      disableClose: true // Prevents closing on outside click
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewProduct(result);
      }
    });
  }

  addNewProduct(newProduct: Product) {
    const uniqueProduct = {
      ...newProduct,
      id: this.generateNewId(),
      purchaseDate: new Date(newProduct.purchaseDate)
    };

    this.newProducts.push(uniqueProduct);
    this.updateTableData();
  }

  updateTableData() {
    // Combine initial products with new products without re-adding previously added products
    this.dataSource.data = [...this.initialProducts, ...this.newProducts];
  }

  generateNewId(): number {
    // Ensure unique IDs by finding the highest ID from both initial and new products
    const allProducts = [...this.initialProducts, ...this.newProducts];
    return allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 1;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
