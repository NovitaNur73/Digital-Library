import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { Camera, CameraOptions } from '@ionic-native/camera'; //Cordova
import { HttpClient, HttpHeaders } from '@angular/common/http';


/**
 * Generated class for the MemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {
  
  frmMember : FormGroup;
  // options : CameraOptions;
  pic : any = '../../assets/imgs/500_F_91852391_KpTeHiL0vZkDbnRqaJsvAX7t2aDTDtEO.jpg';
  mess : any;
  // path : any;
  profile : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public FB: FormBuilder,
    public asc: ActionSheetController,
    // public camera : Camera
    public http : HttpClient,
    public loading : LoadingController,
    public events : Events)
    {
      // this.path = localStorage.getItem('path');
      this.getDataMember();
      this.frmMember = this.FB.group({
        no_anggota : new FormControl(this.profile.no_anggota),
        nama : new FormControl(this.profile.name),
        tempat : new FormControl(this.profile.tempat),
        tgl_lahir : new FormControl(this.profile.tgl_lahir),
        jk : new FormControl(this.profile.jk),
        alamat : new FormControl(this.profile.alamat),
        kota : new FormControl(this.profile.kota),
        telp : new FormControl(this.profile.telp),
        foto : new FormControl(this.pic),
        email : new FormControl(this.profile.email)
      });
      this.getDataMember();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

  getImage(){
    const ActionSheet = this.asc.create({
      title: 'Get Image From :',
      buttons: [
        {
          text: 'Camera',
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            // this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log('Archive clicked');

          }
        },{
          text: 'Album',
          icon: 'image',
          handler: () => {
            // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            console.log('Archive clicked');
          }
        }
      ]
    });
    ActionSheet.present();
  }

  getDataMember(){
    if(localStorage.getItem("profile")){
      this.profile = JSON.parse(localStorage.getItem("profile"));
    } else {
      this.profile = {no_anggota:'',name:'',tempat:'',tgl_lahir:'',jk:'',alamat:'',kota:'',telp:'',foto:''};
    }
  }

  async saveMember(){
    let data = this.frmMember.value;
    let headers : any = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let url : any  = 'http://localhost:8000/mobile/save_member';

      //Animasi Loading 
      let load = this.loading.create({
        content: 'Please Wait',
        spinner : 'crescent'
      });
      load.present();

      //mengirim data ke server
      await this.http.post(url, JSON.stringify(data), headers).subscribe((res : any) => 
      {

        load.dismiss(); //Menghilangkan loading

        //Melakukan cek berhasil atau tidak saat registrasi 
        if(res.type=="success"){
          this.events.publish("prof", JSON.stringify(res.profile));
          localStorage.setItem("profile", JSON.stringify(res.profile));

        } else {
          this.mess = res.msg;
        }
        console.log(res);
      },
      (error : any ) =>
      {
        load.dismiss();
        console.log(error);
        console.log('Something went wrong');
      });
    }

  //   takePicture(SourceType){
  //     this.options = {
  //       quality: 100,
  //       sourceType: sourceType,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE
  //     };

  //     this.camera.getPicture(this.options).then((imageData) => {
  //       let base64Image = 'data:image/jpeg;base64' + imageData;
  //       this.pic = base64Image;
  //     }, (err) => {
  //       console.log(err);
  //   });
  // }
}