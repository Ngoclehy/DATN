import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { ChartModule } from 'primeng/chart';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ChartModule],
})
export class HomeModule {}
