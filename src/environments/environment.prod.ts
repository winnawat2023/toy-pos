import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  firebase : {
    apiKey: "AIzaSyC_a-yENcfkEJANZ8zuVXKgBcMitAy5SJE",
    authDomain: "toycafe-16a14.firebaseapp.com",
    databaseURL: "https://toycafe-16a14-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "toycafe-16a14",
    storageBucket: "toycafe-16a14.appspot.com",
    messagingSenderId: "303092377206",
    appId: "1:303092377206:web:6ad35eb0fda9425965e157",
    measurementId: "G-4C2GG25CKT"
  }
};
