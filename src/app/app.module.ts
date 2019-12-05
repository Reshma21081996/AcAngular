import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 //import { ItemInfoComponent } from './food/item-info/item-info.component';
 //import { MenuComponent } from './food/menu/menu.component';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CartComponent } from './shopping/cart/cart.component';
//import { ItemEditComponent } from './food/item-edit/item-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { SearchComponent } from '../app/search/search.component';
//import { AuthGaurdService } from './auth-gaurd-service.service';
import { HttpClientModule } from '@angular/common/http';
import { SuperuserComponent } from './site/superuser/superuser.component';
import { ProductTypeComponent } from './product/product-type/product-type.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { BillingComponent } from './product/billing/billing.component';
import { BillingHistoryComponent } from './product/billing-history/billing-history.component';

const appRoutes: Routes = [ 
  //{ path: 'edit-food-item/:id', component: ItemEditComponent, canActivate: [AuthGaurdService]},
  { path: 'edit-product/:code', component: ProductEditComponent},
  { path: 'signup/:type', component: SignupComponent},
  { path: 'productType', component: ProductTypeComponent},
  { path: 'login',component: LoginComponent},
  { path: 'superuser',component: SuperuserComponent},
   { path: 'search-bar',component: SearchComponent},
   {path: 'product-list', component: ProductsComponent},
   {path: 'add-product', component: ProductAddComponent},
   {path: 'billing', component: BillingComponent},
   {path: 'billing-history', component: BillingHistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    // ItemInfoComponent,
    // MenuComponent,
     SearchComponent,
    // CartComponent,
    // ItemEditComponent,
     SignupComponent,
     LoginComponent,
     SuperuserComponent,
     ProductTypeComponent,
     ProductsComponent,
     ProductEditComponent,
     ProductAddComponent,
     BillingComponent,
     BillingHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
