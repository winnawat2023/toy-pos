import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css']
})
export class ShopAddComponent implements OnInit {

  shopForm: FormGroup;
  imageURL="../../../../assets/images/user.png";
  selectedFiles?: FileList;

  constructor(
    private shopService: ShopService,
    private router: Router,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      published: [false, Validators.required],
      image:[null,Validators.required]
    });
  }

  saveShop(): void {
    let shop:Shop = this.shopForm.value;
    this.shopService.create(shop).then(() => {
      console.log('create shop successfully! ',shop);
      this.router.navigate(['/shop/list']);
    });
  }

  getBack(){
    this.router.navigate(['/shop/list']);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    const file: File | null = this.selectedFiles.item(0);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageURL=e.target.result;
      this.shopForm.get("image").setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }

}

