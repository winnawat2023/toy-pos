import { Component, Input } from '@angular/core';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { FileUpload } from 'src/app/model/file-upload';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})
export class UploadDetailComponent{

  @Input() fileUpload!: FileUpload;
  
  constructor(private uploadService: FileUploadService) { }


  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
