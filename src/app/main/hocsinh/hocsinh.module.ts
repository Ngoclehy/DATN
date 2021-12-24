import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { HocsinhComponent } from './hocsinh.component';
import { HocSinhRoutingModule } from './hocsinh-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
@NgModule({
  declarations: [
    //HocsinhComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    HocSinhRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class HocsinhModule { }
