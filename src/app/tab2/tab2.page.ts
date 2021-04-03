import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  name:String = '';
  number:String = '';
  uid: String = '';
  contactId: String = '';

  constructor(
    private db: AngularFireDatabase,
    private user: UserService,
    private route: ActivatedRoute,
  ) {
    //this.uid = user.getUid();
    this.uid = localStorage.getItem("uid");

    //Validate key from tab1 to Update Contact
    this.route.params.subscribe(params => {                    
      this.contactId = params['key'];;
      if(this.contactId != undefined) {        
        db.database.ref('list/' + this.uid + '/' + this.contactId).once('value', (snap) => {
          console.log(snap.val());
          this.name = snap.val().name;
          this.number = snap.val().number;
        })
      }
    });    
  }

  save() {
    this.db.database.ref('list/' + this.uid).push({name: this.name, number: this.number})
    .then(() => {
      this.name = '';
      this.number = '';
    })
    .catch(e => {
      console.log(e);
    });
  }

  update() {
    this.db.database.ref('list/' + this.uid + '/' + this.contactId).set({name: this.name, number: this.number})
    .then(() => {
      this.name = '';
      this.number = '';
    })
    .catch(e => {
      console.log(e);
    });
  }

}
