import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  addProductForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  id = 0;
  products: any;

  brands: any;

  // In your component class
  categories: any;

  ngOnInit(): void {
    console.log('in view');

    this.addProductForm = this.formBuilder.group({
      productName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/),
          Validators.maxLength(30)
        ],
      ],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      sequenceSorting: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)],
      ],
      alertQuantity: [
        0,
        [Validators.required, Validators.pattern(/^[0-9\s]+$/)],
      ],
      discount: [0, [Validators.required, Validators.pattern(/^[0-9\s]+$/)]],
      customF1: ['', Validators.required],
      customF2: ['',],
      customF3: ['',],
    });

    this.id = this.activatedRoute.snapshot.queryParams['id'];

    //
    //   const request = this.productService.getProductById(this.id);
    const request = this.productService.getProductById(this.id);

    request.subscribe((response: any) => {
      if (response['status']) {
        this.products = response.data;

        this.addProductForm.controls['productName'].setValue(
          this.products.productName
        );
        this.addProductForm.controls['category'].setValue(
          response.data.productCategoryId
        );
        this.addProductForm.controls['brand'].setValue(response.data.brandId);
        this.addProductForm.controls['sequenceSorting'].setValue(
          response.data.sequenceStoring
        );
        this.addProductForm.controls['alertQuantity'].setValue(
          response.data.alertQuantity
        );
        this.addProductForm.controls['discount'].setValue(
          response.data.discountPercent
        );
        this.addProductForm.controls['customF1'].setValue(
          response.data.customField_1
        );
        this.addProductForm.controls['customF2'].setValue(
          response.data.customField_2
        );
        this.addProductForm.controls['customF3'].setValue(
          response.data.customField3
        );

        console.log(this.products);

        this.getAllBrands();
        this.getAllCategories();
      } else {
        this.toastr.error('Something Went Worng');
      }
    });
  }

  get f() {
    return this.addProductForm.controls;
  }

  addProduct() {
    console.log(' submited');
    console.log(this.addProductForm.valid);

    this.submitted = true;
    if (!this.addProductForm.valid) {
      console.log('in submit. ');
      this.router.navigate(['product']);
    } else {
      const formValues = this.addProductForm.value;
      console.log('Form Values:', formValues);

      const body = {
        productId: this.id,
        productName: formValues.productName,
        brandId: formValues.brand,
        productCategoryId: formValues.category,
        alertQuantity: formValues.alertQuantity,
        sequenceStoring: formValues.sequenceSorting,
        discountPercent: formValues.discount,
        customField1: formValues.customF1,
        customField2: formValues.customF2,
        customField3: formValues.customF3,
      };

      const request = this.productService.UpdateProduct(this.id, body);

      request.subscribe((response: any) => {
        if (response['status']) {
          this.router.navigate(['product']);

          //alert(response.data.message);
          this.toastr.success('Product edited successfully');
        } else {
          //alert(`Error while adding product : ${response['error']}`);
          this.toastr.error('Error while adding product.');
        }
      });
    }
  }

  onBack() {
    alert('2');
    this.router.navigate(['product']);
  }
  getAllBrands() {
    const body = {
      searchByType: 1,
      searchByValue: '',
      fromtDate: '2023-11-17T10:50:38.161Z',
      totDate: '2023-11-17T10:50:38.161Z',
    };

    const result = this.productService.getBrands(body);

    result.subscribe((response: any) => {
      if (response['status']) {
        // this.router.navigate(['product'])

        // alert(response.data.message);

        this.brands = response['data'];
        //console.log(response['data']);
        console.log(this.brands);
      } else {
        alert(`Error while adding product : ${response['error']}`);
      }
    });
  }

  getAllCategories() {
    const result = this.productService.searchProductCategory('', 1);

    result.subscribe((response: any) => {
      if (response['status']) {
        // this.router.navigate(['product'])

        // alert(response.data.message);

        this.categories = response['data'];
        console.log('All catagories L:' + response['data']);
        //console.log(this.categories);
      } else {
        alert(`Error while adding product : ${response['error']}`);
      }
    });
  }
}
