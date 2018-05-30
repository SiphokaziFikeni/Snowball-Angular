// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCPM_wl-SS-NL_WcRJ0P85I2nTBG3waKpw",
    authDomain: "angular-snowball.firebaseapp.com",
    databaseURL: "https://angular-snowball.firebaseio.com",
    projectId: "angular-snowball",
    storageBucket: "angular-snowball.appspot.com",
    messagingSenderId: "1056678707415"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
