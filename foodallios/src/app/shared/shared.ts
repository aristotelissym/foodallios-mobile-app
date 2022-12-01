import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable()
export class SharedFuns {

    constructor (private toastController: ToastController) {}

    async presentToast(position: 'top' | 'middle' | 'bottom', err: string, color: string) {
        const toast = await this.toastController.create({
          message: err,
          duration: 2500,
          position: position,
          animated: true,
          color: color
        })
    
        await toast.present();
    }

    async updateSessionStorage(sesName , value) {
      let sesStore = JSON.parse(sessionStorage.getItem(sesName));
      sesStore.push(value)
      sessionStorage.setItem(sesName, JSON.stringify(sesStore));
    }

}