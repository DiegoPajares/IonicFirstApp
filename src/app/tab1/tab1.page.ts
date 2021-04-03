import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  itemRef: any;
  contacts = [];
  uid: String;
  isLoading = false;

  constructor(
    private db: AngularFireDatabase,
    private user: UserService,
    private router: Router,
    private loading: LoadingService
  ) {
    //this.uid = user.getUid();
    this.uid = localStorage.getItem("uid");
  }

  ngOnInit(){
    this.loading.present('Loading Contacts...');
    this.itemRef = this.db.object('list/' + this.uid);    
    this.itemRef.snapshotChanges().subscribe(      
      action => {              
        //console.log(action.payload.val())
        this.contacts = [];
        let data = action.payload.val();      
        for(let k in data) {
          let user = data[k];
          //console.log(user, k);
          user.key = k;
          this.contacts.push(user);        
        }
        this.loading.dismiss();
        console.log(this.contacts);      
      },
      error => {
        console.log(error);
        this.loading.dismiss();
      });
  }

  edit(key: String) {
    console.log(key);    
    this.router.navigate(['/tabs/tab2', key]);
  }

  delete(key: String) {
    this.db.database.ref('list/' + this.uid + '/' + key).remove();
    console.log(key);
  }  

}
