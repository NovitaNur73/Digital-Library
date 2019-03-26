import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public orders : any;
  // path : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http : HttpClient,
    public loading : LoadingController )
    {
      if(localStorage.getItem("pinjam")){
        this.orders = JSON.parse(localStorage.getItem("pinjam"));
        console.log(this.orders);
      }
      // this.path = localStorage.getItem("path");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

   async save() {
    // Ambil Data User
    let user = JSON.parse(localStorage.getItem("profile"));
    // Data yang akan dikirim
    let data = { anggota : user.no_anggota , buku : this.orders }
    let headers : any = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let url : any = 'http://localhost:8000/mobile/save_booking';

    //Animasi Please Wait
    let load = this.loading.create({
      content : 'Please Wait',
      spinner : 'crescent'
    });
    load.present();

    //mengirim data ke server
    await this.http.post(url,JSON.stringify(data), headers).subscribe((res : any)=> 
    {
      console.log(res);
      load.dismiss();

      // Melakukan cek berhasil atau tidak saat registrasi
    if(res.type=="success"){
      localStorage.setItem("pinjam","");
      this.navCtrl.setRoot(CartPage);
    } else {
      alert("error");
    }
  },
  (error : any)=>
  {
    load.dismiss();
    console.log(error);
    console.log('Something Went Wrong!');
  });
  console.log(data);

  }

}