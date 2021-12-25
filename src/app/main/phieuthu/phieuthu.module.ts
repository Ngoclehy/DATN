import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhieuthuComponent } from './phieuthu.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { PhieuThuRoutingModule } from './phieuthu-routing.module';

import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    PhieuthuComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    PhieuThuRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class PhieuthuModule { }
