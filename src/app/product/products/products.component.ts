import { Component, OnInit, Input } from '@angular/core';
import { products } from '../products';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { AuthServiceService } from 'src/app/site/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() types:products[];
  isAdmin: boolean = false;
  //productsList:products[];
  filteredProductsList:products[];

  

  constructor(private productService: ProductServiceService, private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    console.log(this.types);
    this.isAdmin=this.authService.isAdmin;
    console.log(this.isAdmin);
    this.productService.getAllProducts().subscribe(
      data =>{ this.types=data; 
      }); 
      this.router.navigate(['/search-bar']);
  }

  delete(code: string) {
    this.productService.deleteProduct(code).subscribe(
      data => { this.ngOnInit();
      }
    );
    
  }
  
  

}
