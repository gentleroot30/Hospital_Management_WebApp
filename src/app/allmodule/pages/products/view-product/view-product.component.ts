import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  addProductForm!: FormGroup;
  submitted = false;


  id = 0 ;
  products : any

  

  constructor(
    private formBuilder: FormBuilder ,
    private productService : ProductService ,
    private activatedRoute : ActivatedRoute ,
    private router : Router
  ) { }



  ngOnInit(): void {
    
    console.log("in view")
    
        this.addProductForm = this.formBuilder.group({
    
        productName: ['', Validators.required],
        category: ['', Validators.required],
        brand: ['', [Validators.required]],
        sequenceSorting: ['', Validators.required],
        alertQuantity: [0, Validators.required],
        discount:[0,Validators.required],
        customF1:['',Validators.required],
        customF2:['',Validators.required],
        customF3:['',Validators.required],
      });
    
        this.id = this.activatedRoute.snapshot.queryParams['id']

//   
//   const request = this.productService.getProductById(this.id);
  const request = this.productService.getProductById(this.id);

  request.subscribe((response: any) => {
    if (response['status']) {
      this.products = response.data;
      console.log(response.data.sequenceStoring
        );
      

     
        //const product = this.products[0];
        
        //alert(this.products  );

      
        this.addProductForm.controls['productName'].setValue(this.products.productName);
        this.addProductForm.controls['category'].setValue(response.data.PRODUCT_CATEGORYName);
        this.addProductForm.controls['brand'].setValue(response.data.brandName);
        this.addProductForm.controls['sequenceSorting'].setValue(response.data.sequenceStoring);
        this.addProductForm.controls['alertQuantity'].setValue(response.data.alertQuantity);
        this.addProductForm.controls['discount'].setValue(response.data.discountPercent);
        this.addProductForm.controls['customF1'].setValue(response.data.customField_1);
        this.addProductForm.controls['customF2'].setValue(response.data.customField_2);
        this.addProductForm.controls['customF3'].setValue(response.data.customField3);

      
  }else{

    alert('somethisng went wrong.')
  }

  });


}


  onBack(){

    //console.log("in view");
    alert('1')
    this.router.navigate(['product'])


  }

  onEdit(){

    this.router.navigate(['edit-product'] ,{queryParams : {id : this.id}})
  }

}
