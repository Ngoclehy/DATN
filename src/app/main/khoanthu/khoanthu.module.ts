import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { IndexComponent } from './index/index.component';
import { KhoanthuComponent } from './khoanthu.component';
import { KhoanThuRoutingModule } from './khoanthu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    KhoanthuComponent,
    CreateComponent,
    UpdateComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    KhoanThuRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ]
})
export class KhoanthuModule { }
