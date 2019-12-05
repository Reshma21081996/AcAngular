import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { products } from '../products';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  types=["Electronics","Clothing & Accessories","Home Decor","Sports & Fitness"]
  productForm: FormGroup;
  product:products;

  constructor(private formBuild:FormBuilder,private productService:ProductServiceService,private route : ActivatedRoute,private router:Router) { }

  ngOnInit() {
    // const productId = this.route.snapshot.paramMap.get('code');
    // console.log("############# "+productId);
    // //this.foodItem = this.foodservice.getFoodItem(+foodItemId);
    // this.productService.getProduct(productId).subscribe(
    //   (data) => {
    //     //data.addedDate = new Date(data.addedDate)
    //     this.product = data;

    //     this.form();
    //   }
    // )
    this.form();    
  }

  form() {
    
    this.productForm = this.formBuild.group({
      editCode: [null,[
        Validators.required
      ]],
      editName: [null,[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      editURL: [null,[
        Validators.required
      ]],
      editBrand: [null,[
        Validators.required
      ]],
      editStock: [null,[
        Validators.required
      ]],
      rate: [null,[
        Validators.required
      ]],
      addDate: [null,[
        Validators.required
      ]],
      manufactureDate: [null,[
        Validators.required
      ]],
      expiryDate:[null,[
        Validators.required
      ]],
      aisle: [null,[
        Validators.required
      ]],
      shelf: [null,[
        Validators.required
      ]],
      type: [null,[
        Validators.required
      ]],
    //   active: [this.product.active,[
    //     Validators.required
    //   ]],
    //   freeDelivery: [this.product.freeDelivery]
    // })
  })

}

get editCode() {
  return this.productForm.get('editCode');
}
get editName() {
  return this.productForm.get('editName');
}
get editURL() {
  return this.productForm.get('editURL');
}
get editBrand() {
  return this.productForm.get('editBrand');
}
get editStock() {
  return this.productForm.get('editStock');
}
get rate() {
  return this.productForm.get('rate');
}
get addDate() {
  return this.productForm.get('addDate');
}
get manufactureDate() {
  return this.productForm.get('manufactureDate');
}
get expiryDate() {
  return this.productForm.get('expiryDate');
}
get aisle() {
  return this.productForm.get('aisle');
}
get shelf() {
  return this.productForm.get('shelf');
}
get type() {
  return this.productForm.get('type');
}

onAddClick() {
  console.log("************************************##");
  console.log(this.productForm.value['editCode']);
  let newList:products = {productCode:this.productForm.value['editCode'],productName:this.productForm.value['editName'],productBrand:this.productForm.value['editBrand'],
  stockCount:this.productForm.value['editStock'],ratePerQuantity:this.productForm.value['rate'],manufactureDate:new Date(this.productForm.value['manufactureDate']), expiryDate:new Date(this.productForm.value['expiryDate']),
  addedDate:new Date(this.productForm.value['addDate']),
  aisle:this.productForm.value['aisle'],
  shelf:this.productForm.value['shelf'], productType:this.productForm.value['type'],
  productImage:this.productForm.value['editURL'],quantity:null}

  console.log("!!!!!!!!"+newList.productCode);
  console.log("!!!!!!!!"+newList);
  console.log("************************************##))))))))))))))");
  this.productService.addProduct(newList).subscribe(
    (data) =>{
      newList=data;

      //this.router.navigate(['search-bar'])
    }
  )
  this.router.navigate(['search-bar'])
  console.log("************************************##-----------------");
}

}
