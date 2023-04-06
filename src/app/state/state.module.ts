import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { EffectsModule, provideEffects } from "@ngrx/effects";
import { provideStore, StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/enviorment/enviorment";
import { UserFacade, userFeature } from "./users";


@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,

        EffectsModule.forRoot([
            UserFacade
        ]),

        StoreModule.forFeature(userFeature),
        StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],
    providers: [
        provideStore(),
        provideEffects(UserFacade),

    ]
})
export class AppStateModule { }