import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

  }

  login(){
    console.log(this.loginForm.value);
    this.auth.signInWithEmailAndPassword(
      this.loginForm.controls["email"].value, 
      this.loginForm.controls["password"].value
    ).then(userData => {
      console.log(userData);
    })
  }

}
