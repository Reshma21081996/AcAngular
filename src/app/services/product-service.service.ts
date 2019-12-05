import { Injectable } from '@angular/core';
import { products } from '../product/products';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../site/auth-service.service';
import { PurchaseHistory } from '../product/purchaseHistory';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private token: string;
  isAdmin: boolean = false;
  //isLoggedIn: boolean = false;
  private subject = new Subject<string[]>();
  private subject1 = new Subject<products[]>();
  prodList:products[];
  filteredProdList:string[];
  types: string[];
  images: string[];

  public setToken(token: string){
    this.token = token;
  }

  public getToken() {
    return this.token;
  }

  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { 
    console.log(this.types);
    this.isAdmin=this.authService.isAdmin;
  }

  getAllProductTypes(): Observable<string[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.getToken());
    console.log("in getAllProductTypes");
    //if(headers != null) {
      return this.httpClient.get<string[]>('http://localhost:8083/smartshop-service/products/typelist',{headers});
   // }
   // else {  
   //   return this.httpClient.get<string[]>('http://localhost:8091/products/typelist');
   // }
  }

  getSubject(): Subject<string[]> {
    return this.subject;
  }

  getAllProductsList(type: string): Observable<products[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
    console.log("in service");
    
      return this.httpClient.get<products[]>('http://localhost:8083/smartshop-service/products/'+type,{headers});
    
  }

  

  // getProductTypeImage(): Observable<string[]> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', 'Bearer '+this.getToken());
  //   console.log("in getAllProductImages");    
  //     return this.httpClient.get<string[]>('http://localhost:8091/products/typeimage',{headers});   
  // }

  getAllProducts(): Observable<products[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
    console.log("in getAllProducts");
    
      return this.httpClient.get<products[]>('http://localhost:8083/smartshop-service/products',{headers});
  }
  
  getProduct(code: string): Observable<products> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
    console.log("in getProduct");
    
      return this.httpClient.get<products>('http://localhost:8083/smartshop-service/products/code/'+code,{headers});
    
  }

  modifyProduct(product: products): Observable<products> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
    console.log("in modifyProduct");
    
      return this.httpClient.put<products>('http://localhost:8083/smartshop-service/products/',product,{headers});
  }

  addProduct(product: products) {
    //console.log("1234567890 "+product.productName);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
    console.log("in addProduct");
    
      return this.httpClient.post<products>('http://localhost:8083/smartshop-service/products/',product,{headers});
  }

  deleteProduct(code: string):Observable<any> {
    //console.log("1234567890 "+product.productName);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
    console.log("in deleteProduct");
    
      return this.httpClient.delete('http://localhost:8083/smartshop-service/products/'+code,{headers});
  }

  getBill(name:string):Observable<PurchaseHistory[]>
  {
  let headers=new HttpHeaders();
  headers=headers.set('Authorization','Bearer '+this.authService.getToken());
 return this.httpClient.get<PurchaseHistory[]>('http://localhost:8083/smartshop-service/products/bill/'+name,{headers}); 
   }


   postBill(contact: string, code: string, quantity: number): Observable<PurchaseHistory> {
     //console.log("1234567890 "+product.productName);
     let headers = new HttpHeaders();
     headers = headers.set('Authorization', 'Bearer '+this.authService.getToken());
     console.log("in postBill");
    
       return this.httpClient.post<PurchaseHistory>('http://localhost:8083/smartshop-service/products/bill/'+contact+'/'+code+'/'+quantity,{headers});
   }

}
