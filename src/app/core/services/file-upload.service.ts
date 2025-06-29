import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/model/file-upload';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root'
})



export class FileUploadService {

  currentFileUpload: FileUpload;

  // private basePath = '/uploads';


  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage
    , private shopService: ShopService) { }

  pushFileToStorage(fileUpload: FileUpload, storagePath: string, dbPath: string, dbKey: string): Observable<number | undefined> {
    const filePath = `${storagePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, dbPath, dbKey);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload, dbPath: string, dbKey: string): void {
    console.log('saveFileData', fileUpload);
    console.log('dbPath', dbPath);
    console.log('dbKey', dbKey);
    const data = {
      image: fileUpload
    };
    console.log('data', data);

   
  }

  getFiles(numberItems: number, basePath: string): AngularFireList<FileUpload> {
    return this.db.list(basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload, basePath: string): void {
    this.deleteFileStorage(fileUpload.name, basePath);
  }

  private deleteFileDatabase(key: string, basePath: string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  private deleteFileStorage(name: string, basePath: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }
}