import { Component, OnInit, Input } from '@angular/core';
import { products } from '../products';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

//  /@Input() product:products;
  @Input() list:string;
  itemsList:products[];
  filteredProdList:products[];
  
  constructor(private productService: ProductServiceService, private router: Router) { }

  ngOnInit() {
    //this.product=this.productService.types;
    console.log("type")
  }

  products(type: string) {
    console.log("in function");
    this.productService.getAllProductsList(type).subscribe(
      data => { this.itemsList=data;
        //this.productService.filteredProdList=data;
       // console.log(this.productService.filteredProdList);
       // this.router.navigate(['product-list']);
      }
    );
  }
}
