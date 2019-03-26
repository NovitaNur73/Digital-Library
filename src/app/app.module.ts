import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';
import { BukuPage } from '../pages/buku/buku';
import { SingleBukuPage } from '../pages/single-buku/single-buku';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { PeminjamanPage } from '../pages/peminjaman/peminjaman';
import { CartPage } from '../pages/cart/cart';
import { MemberPage } from '../pages/member/member';


@NgModule({
  declarations: [
    MyApp,
    StartPage,
    LoginPage,
    RegisterPage,
    HomePage,
    PeminjamanPage,
    BukuPage,
    SingleBukuPage,
    CartPage,
    MemberPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    LoginPage,
    RegisterPage,
    HomePage,
    PeminjamanPage,
    BukuPage,
    SingleBukuPage,
    CartPage,
    MemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
