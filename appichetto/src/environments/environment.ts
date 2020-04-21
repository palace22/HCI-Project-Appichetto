// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAdf_u0iQPWIjZjKw0NKfrsggg0-y665uY",
    authDomain: "appichetto-7e393.firebaseapp.com",
    databaseURL: "https://appichetto-7e393.firebaseio.com",
    projectId: "appichetto-7e393",
    storageBucket: "appichetto-7e393.appspot.com",
    messagingSenderId: "881758715548",
    appId: "1:881758715548:web:4c806ce98019d11ebfb759",
    measurementId: "G-0Z3SY0MSYT"
  },
  firebaseDB: {
    users: "users",
    user_friends: "user_group",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
