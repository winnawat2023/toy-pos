import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { FileUpload } from 'src/app/model/file-upload';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  shopForm: FormGroup;
  selectedFiles?: FileList;
  imageURL="../../../../assets/images/user.png";
  

  @Input() shop?: Shop;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  currentShop: Shop = {
    title: '',
    description: '',
    published: false,
    image:undefined
  };

  constructor(private shopService: ShopService, private router: Router, private fb: FormBuilder, private uploadService: FileUploadService) { }

  ngOnInit(): void {

    this.shopForm = this.fb.group({
      key:[null,Validators.required],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      published: [null, Validators.required],
      image:[null,Validators.required]
    });

    if (this.shopService.currentShop) {
      this.currentShop = this.shopService.currentShop;
      this.shopForm.get("key").setValue(this.currentShop.key);
      this.shopForm.get("title").setValue(this.currentShop.title);
      this.shopForm.get("description").setValue(this.currentShop.description);
      this.shopForm.get("published").setValue(this.currentShop.published);
      this.shopForm.get("image").setValue(this.currentShop.image);
      if(this.currentShop.image){
        this.imageURL = this.currentShop.image
      }
      
    } else {
      this.router.navigate(['/shop']);
    }
  }

  

  updateShop(): void {
    this.currentShop = this.shopForm.value;
    console.log(this.currentShop);
    if (this.currentShop.key) {
      this.shopService.update(this.currentShop)
        .then(() => this.router.navigate(['/shop']))
        .catch(err => console.log(err));
    }
  }

  getBack(){
    this.router.navigate(['/shop']);
  }

  deleteShop(): void {
    console.log("deleteShop ",this.shopService.currentShop);
    if (this.shopService.currentShop) {
      this.shopService.delete(this.shopService.currentShop.key)
        .then(() => {
          this.refreshList.emit();
          
          this.router.navigate(['/shop']);
        })
        .catch(err => console.log(err));
    }
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
