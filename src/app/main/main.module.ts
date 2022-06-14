import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainRoutingModule } from './main-routing.module';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { PermisionComponent } from './permision/permision.component';
import { UserComponent } from './user/user.component';
import { LophocComponent } from './lophoc/lophoc.component';
import { KhoanthuComponent } from './khoanthu/khoanthu.component';
import { CanNotAccessComponent } from './can-not-access/can-not-access.component';
import { KhoanchiComponent } from './khoanchi/khoanchi.component';

@NgModule({
  declarations: [
    MainComponent,
    NotFoundComponent,
    HocsinhComponent,
    UserComponent,
    LophocComponent,
    CanNotAccessComponent,
    KhoanchiComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
