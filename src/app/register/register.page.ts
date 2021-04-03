import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private FireAuth: AngularFireAuth,
    private fb: FormBuilder,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirm: ["", Validators.required],
    });
  }

  register(){
    console.log(this.registerForm.value);
    let user = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
    }    
    this.FireAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(userData=> {
      this.db.database.ref('user/' + userData.user.uid).set(this.registerForm.value);
      console.log(userData);
    })
    .catch(e=> {
      console.log(e);
    })
  }

}
