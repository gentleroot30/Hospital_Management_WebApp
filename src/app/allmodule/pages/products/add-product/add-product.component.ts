import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/allmodule/services/api_services/product.service';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  submitted = false;

  brands = [
    {
      brandId: 1,
      brandName: 'brand1',
      description: 'xyz',
      createdAt: '2023-11-16T11:03:21.8449751',
      createdBy: 1,
    },
  ];

  // In your component class
  categories = [{ categoryId: 1, categoryName: 'Category 1' }];

  // productName = ""
  // category= 1
  // brand = 1
  // sequenceSorting =  ""
  // alertQuantity=0
  // discount=0
  // customF1=""
  // customF2=""
  // customF3=""

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
    private constants: Constants
  ) { }

  ngOnInit(): void {
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
      customF2: ['', ],
      customF3: ['', ],
    });

    this.getAllBrands();
    this.getAllCategories();
  }

  get f() {
    return this.addProductForm.controls;
  }

  addProduct() {
    this.submitted = true;
    if (!this.addProductForm.valid) {

      return;
    } else {
      const formValues = this.addProductForm.value;
      console.log('Form Values:', formValues);

      const body = {
        productName: formValues.productName,
        brandId: formValues.brand,
        productCategoryId: formValues.category,
        alertQuantity: formValues.alertQuantity,
        sequenceStoring: formValues.sequenceSorting,
        discountPercent: formValues.discount,
        customeField1: formValues.customF1,
        customeField2: formValues.customF2,
        customeField3: formValues.customF3,
      };

      const request = this.productService.AddProduct(body);

      request.subscribe((response: any) => {
        // console.log(response);

        if (response['status']) {
          this.router.navigate(['product']);

          //alert(response.data.message);

          this.toastr.success('Product added successfully');
        }
        else {
          //alert(`Error while adding product : ${response['error']}`);
          this.toastr.error(
            `Error while adding product : ${response['error']}`
          );
        }
      });
    }
  }

  onSubmit() { }

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
        //alert(`Error while adding product : ${response['error']}`);
        this.toastr.error(`Error while loading brands : ${response['error']}`);
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
        //alert(`Error while adding product : ${response['error']}`);
        this.toastr.error(
          `Error while loading Catagories : ${response['error']}`
        );
      }
    });
  }
}
