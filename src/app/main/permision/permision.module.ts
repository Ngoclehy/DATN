import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { PermisionComponent } from './permision.component';
import { PermisionRoutingModule } from './permision-routing.module';
@NgModule({
  declarations: [
    PermisionComponent,
    IndexComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    PermisionRoutingModule

  ]
})
export class PermisionModule { }
