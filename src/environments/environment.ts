import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
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


