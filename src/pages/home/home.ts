import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SingleBukuPage } from '../single-buku/single-buku';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public buku : any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public menuCtrl: MenuController
    ) {
      this.loadBuku();
      this.menuCtrl.enable(true);
  }

   loadBuku(){
    let data : Observable<any>;
    data = this.http.get('http://localhost:8000/mobile/get_buku');
    data.subscribe(res => {
      this.buku = res;
    });
  }

  viewBuku(bk){
    this.navCtrl.push(SingleBukuPage,{ buku: bk });
  }

}