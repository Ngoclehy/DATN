import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ChartModule, FormsModule, NgxPaginationModule],
})
export class HomeModule {}
