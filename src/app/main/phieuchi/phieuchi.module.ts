import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhieuchiComponent } from './phieuchi.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { PhieuChiRoutingModule } from './phieuchi-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PhieuchiComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    PhieuChiRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class PhieuchiModule { }
