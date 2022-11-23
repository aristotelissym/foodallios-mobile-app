import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable()
export class SharedFuns {

    constructor (private toastController: ToastController) {}

    async presentToast(position: 'top' | 'middle' | 'bottom', err: string, ic: string, color: string) {
        const toast = await this.toastController.create({
          message: err,
          duration: 1500,
          position: position,
          animated: true,
          color: color,
          icon: ic
        })
    
        await toast.present();
    }

    async updateSessionStorage(sesName , value) {
      let sesStore = JSON.parse(sessionStorage.getItem(sesName));
      sesStore.push(value)
      sessionStorage.setItem(sesName, JSON.stringify(sesStore));
    }
}