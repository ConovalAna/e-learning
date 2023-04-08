import { NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { environment } from '../enviorment/enviorment';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './account/verify-email/verify-email.component';

// import { AuthService } from "./shared/services/auth.service";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppStateModule } from './state/state.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdminModule } from './admin/admin.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { SmartbyteMaterialModule } from './smartbyte-material.module';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/compat';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppStateModule,
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AdminModule,
    SmartbyteMaterialModule,
    LottieModule.forRoot({ player: playerFactory }),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideStorage(() => {
    //   console.log("test");
    //   const storage = getStorage(getApp());
    //   console.log(storage);

    //   return storage;
    // }
    // ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
