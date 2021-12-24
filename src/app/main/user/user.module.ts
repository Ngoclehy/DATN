import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { PermisionComponent } from './permision/permision.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    UpdateComponent,
    PermisionComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
