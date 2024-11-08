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
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-products-master',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatTableModule, MatSortModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule, RouterLinkActive, RouterLink, RouterOutlet,  MatPaginator, MatPaginatorModule],
  templateUrl: './products-master.component.html',
  styleUrls: ['./products-master.component.css']
})
export class ProductsMasterComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  private http = inject(HttpClient);
  searchValue = '';

  displayedColumns: string[] = ['id', 'name', 'price', 'purchaseDate', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  initialProducts: Product[] = []; // Separate array to hold productDetails.json data
  newProducts: Product[] = []; // Array for newly added products

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, private dialog: MatDialog) {
    this.loadProductData();
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        data.id.toString().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        data.price.toString().includes(searchTerm) ||
        data.purchaseDate.toDateString().includes(searchTerm) ||
        data.quantity.toString().includes(searchTerm)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  openEditProductDialog(productDetails: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '80%',
      disableClose: true, // Prevents closing on outside click
      data: productDetails // Pass product details to dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.id = productDetails.id;
        this.editProduct(result, productDetails.id);
      }
    });
  }

  editProduct(updatedProduct: Product, productID: number) {
    console.log(updatedProduct);
    const productIndex = this.newProducts.findIndex(prod => prod.id === productID);
    if (productIndex > -1) {
      // Update in newProducts array
      this.newProducts[productIndex] = updatedProduct;
    } else {
      // Update in initialProducts array if it's an original product
      const initialProductIndex = this.initialProducts.findIndex(prod => prod.id === updatedProduct.id);
      if (initialProductIndex > -1) {
        this.initialProducts[initialProductIndex] = updatedProduct;
      }
    }
    this.updateTableData();
  }

  openDeleteProductDialog(productId: number) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '80%',
      disableClose: true // Prevents closing on outside click
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: number) {
    this.newProducts = this.newProducts.filter(prod => prod.id !== productId);
    this.initialProducts = this.initialProducts.filter(prod => prod.id !== productId);
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

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }
}
