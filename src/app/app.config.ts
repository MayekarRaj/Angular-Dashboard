import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(
      // environment.firebase
      {
      //   // "projectId":"angular-dashboard-d2183",
      //   // "appId":"1:836329082169:web:f42de8bf930c7c8563ece8",
      //   // "storageBucket":"angular-dashboard-d2183.appspot.com",
      //   // "apiKey":"AIzaSyAuQVHBQFjWudyvBDh-tbTpVGat84u8Ru4",
      //   // "authDomain":"angular-dashboard-d2183.firebaseapp.com",
      //   // "messagingSenderId":"836329082169",
        apiKey: "AIzaSyAuQVHBQFjWudyvBDh-tbTpVGat84u8Ru4",
        authDomain: "angular-dashboard-d2183.firebaseapp.com",
        projectId: "angular-dashboard-d2183",
        storageBucket: "angular-dashboard-d2183.appspot.com",
        messagingSenderId: "836329082169",
        appId: "1:836329082169:web:f42de8bf930c7c8563ece8"
      }
    )),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
    provideDatabase(() => getDatabase()), 
    provideStorage(() => getStorage())
  ]
};
