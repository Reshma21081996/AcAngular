import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { products } from '../products';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  types=["Electronics","Clothing & Accessories","Home Decor","Sports & Fitness"]
  productForm: FormGroup;
  product:products;

  constructor(private formBuild:FormBuilder,private productService:ProductServiceService,private route : ActivatedRoute,private router:Router) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('code');
    console.log("############# "+productId);
    //this.foodItem = this.foodservice.getFoodItem(+foodItemId);
    this.productService.getProduct(productId).subscribe(
      (data) => {
        //data.addedDate = new Date(data.addedDate)
        this.product = data;

        this.form();
      }
    )
    console.log("***************** "+this.product);
    this.form();    
  }

  form() {
    
    this.productForm = this.formBuild.group({
      editName: [this.product.productName,[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      editURL: [this.product.productImage,[
        Validators.required
      ]],
      editBrand: [this.product.productBrand,[
        Validators.required
      ]],
      editStock: [this.product.stockCount,[
        Validators.required
      ]],
      rate: [this.product.ratePerQuantity,[
        Validators.required
      ]],
      addDate: [this.product.addedDate,[
        Validators.required
      ]],
      manufactureDate: [this.product.manufactureDate,[
        Validators.required
      ]],
      expiryDate: [this.product.expiryDate,[
        Validators.required
      ]],
      aisle: [this.product.aisle,[
        Validators.required
      ]],
      shelf: [this.product.shelf,[
        Validators.required
      ]],
      type: [this.product.productType,[
        Validators.required
      ]]
    //   active: [this.product.active,[
    //     Validators.required
    //   ]],
    //   freeDelivery: [this.product.freeDelivery]
    // })
  })

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

onSaveClick() {
  let newItem:products = {productCode:this.product.productCode,productName:this.productForm.value["editName"],productBrand:this.productForm.value["editBrand"],
  stockCount:this.productForm.value["editStock"],ratePerQuantity:+this.productForm.value["rate"],
  addedDate:new Date(this.productForm.value["addDate"]), expiryDate:new Date(this.productForm.value["expiryDate"]),
  manufactureDate:new Date(this.productForm.value["manufactureDate"]),aisle:this.productForm.value["aisle"],
  shelf:this.productForm.value["shelf"], productType:this.productForm.value["type"],
  productImage:this.productForm.value["editURL"],quantity:null}
  console.log("!!!!!!!!"+this.product.productCode);
  console.log("!!!!!!!!"+newItem.productCode);
  this.productService.modifyProduct(newItem).subscribe(
    (data) => {
      newItem = data;
    }
  );
  this.router.navigate(['search-bar'])
}

}
