import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present(LoadingMessage: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
      cssClass: 'my-custom-class',
      message: LoadingMessage,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    if(this.isLoading == true){
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
  }
}