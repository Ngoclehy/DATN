import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { GiaovienComponent } from './giaovien.component';
import { IndexComponent } from './index/index.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { GiaoviencRoutingModule } from './giaovien-routing.module';


@NgModule({
  declarations: [
    GiaovienComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    GiaoviencRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class GiaovienModule { }
