import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid: String = '';

  constructor() { }

  setUid(_uid: string) {
    this.uid = _uid;
  }

  getUid() {
    return this.uid;
  }

}
