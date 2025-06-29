import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {

  fileUploads?: any[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.uploadService.getFiles(10,"").snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
      console.log('fileUploads',this.fileUploads);
    });
  }

  delete(fileUpload){
    this.uploadService.deleteFile(fileUpload,"");
  }
}
