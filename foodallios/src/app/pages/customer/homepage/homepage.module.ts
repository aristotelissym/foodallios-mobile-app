import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { MaterialModule } from 'src/app/material.module';
import {MatListModule} from '@angular/material/list';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    MaterialModule,
    QRCodeModule,
  ],
  declarations: [HomepagePage]
})
export class HomepagePageModule {}
