import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePagePageRoutingModule } from './welcome-page-routing.module';

import { WelcomePagePage } from './welcome-page.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePagePageRoutingModule,
    MaterialModule
  ],
  declarations: [WelcomePagePage]
})
export class WelcomePagePageModule {}
