import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadListComponent } from './upload-list/upload-list.component';



@NgModule({
  declarations: [
    UploadFormComponent,
    UploadListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UploadRoutingModule
  ]
})
export class UploadModule { }
