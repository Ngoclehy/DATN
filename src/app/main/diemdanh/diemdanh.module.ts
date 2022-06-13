import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiemdanhRoutingModule } from './diemdanh-routing.module';
import { DiemdanhComponent } from './diemdanh.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { IndexComponent } from './index/index.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ChitietComponent } from './chitiet/chitiet.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    DiemdanhComponent,
    CreateComponent,
    UpdateComponent,
    IndexComponent,
    ChitietComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    DiemdanhRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class DiemdanhModule {}
