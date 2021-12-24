import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { LophocRoutingModule } from './lophoc-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    UpdateComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    LophocRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class LophocModule { }
