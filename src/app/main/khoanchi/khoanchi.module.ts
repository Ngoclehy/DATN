import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhoanChiRoutingModule } from './khoanchi-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    UpdateComponent,
  ],
  imports: [
    CommonModule,
    KhoanChiRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class KhoanchiModule { }
