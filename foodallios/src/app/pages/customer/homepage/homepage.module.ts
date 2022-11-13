import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { MaterialModule } from 'src/app/material.module';
import { MatCardSubtitle  } from "@angular/material/card";
import { MatProgressBar } from "@angular/material/progress-bar";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    MaterialModule,
  ],
  declarations: [HomepagePage]
})
export class HomepagePageModule {}
