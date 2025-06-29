import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Config } from 'src/app/model/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private dbPath = '/config';
  configRef: AngularFireList<Config>;

  constructor(private db: AngularFireDatabase) {
    this.configRef = db.list(this.dbPath);
  }

 
  getAll(): AngularFireList<Config> {
    return this.configRef;
  }

 

  
}
