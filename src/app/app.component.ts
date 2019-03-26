import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';
import { BukuPage } from '../pages/buku/buku';
import { PeminjamanPage } from '../pages/peminjaman/peminjaman';
import { CartPage } from '../pages/cart/cart';
import { MemberPage } from '../pages/member/member';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = StartPage;
  profile : any = "";

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events : Events
    ) {
    this.initializeApp();
    
    this.events.subscribe("prof",(data)=>{
      this.profile = JSON.parse(data);
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: ' Home ', component: HomePage , icon :'home'},
      { title: ' Buku ', component: BukuPage , icon :'book'},
      { title: ' Peminjaman ', component: PeminjamanPage , icon :'basket'},
      { title: ' Cart ', component: CartPage , icon :'logo-buffer'},
      { title: ' Become Member ', component: MemberPage , icon :'card'}
    ];

    // Set Path Global
    // localStorage.setItem('path','http://localhost/perpus/api');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  LogOut(){
    localStorage.setItem('profile','');
    localStorage.setItem('pinjam','');
    this.nav.setRoot(LoginPage);
  }


}
