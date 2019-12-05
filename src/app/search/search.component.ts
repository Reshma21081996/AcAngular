import { Component, OnInit } from '@angular/core';
import { products } from '../product/products';
import { ProductServiceService } from '../services/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKey:string;
  prodList:string[];
  filteredProdList:string[];
  //isAdmin:boolean=false;
 

  constructor(public productService: ProductServiceService, private router: Router) /* private menuItemService:MenuItemService */ { }

  ngOnInit() {    
      this.productService.getAllProductTypes().subscribe(
        data =>{ this.prodList=data;
          this.filteredProdList=data; 
        }); 

     /* this.productService.getAllProductTypes().subscribe(
      data=>{this.productService.types=data;
      console.log(this.productService.types)}); 
     // this.router.navigate(['/productType']); */

      /* this.productService.getProductTypeImage().subscribe(
        data=>{this.productService.images=data;
        console.log(this.productService.images)}); */
    
  }

  search() {
    /* this.productService.getAllProductTypes().subscribe(
      data =>{this.prodList=data; });
    this.isAdmin = this.productService.isAdmin; */
    /* if(this.isAdmin){
      this.itemList = this.menuItemService.getAllFoodItems();
    }
    else{
      this.itemList = this.menuItemService.getFoodItems();
    } */
    // this.filteredProdList = this.prodList;
    //this.filteredProdList = this.prodList.filter(l => (l.productName.toLowerCase().indexOf(this.searchKey.toLocaleLowerCase())!=-1)||(l.productType.indexOf(this.searchKey.toLocaleLowerCase())!=-1));
  
    this.filteredProdList = this.prodList.filter(n => n.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase()));
    //this.productService.getSubject().next(this.filteredProdList);
    //console.log(this.prodList);
    console.log(this.filteredProdList);
  }

 

}
