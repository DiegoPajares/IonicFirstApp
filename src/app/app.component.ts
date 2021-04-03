import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private auth: AngularFireAuth,
    private router: Router,
    private user: UserService,
  ) {
    this.initializeApp();
    this.verifyCurrentUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Initialize App...");
    })
  }

  verifyCurrentUser(){
    this.auth.authState.subscribe((e:any) => {      
      console.log(e);
      if(e){
        console.log("Logeado uid:" + e.uid);
        this.user.setUid(e.uid);
        localStorage.setItem("uid", e.uid);
        this.router.navigate(["/"], {replaceUrl: true});
      }else{
        console.log("Falta logearse");
        this.router.navigate(["/login"]);
      }
    })
  }
}
