import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { RolesGuard } from 'src/app/core/guard/roles.guard';
const routes: Routes = [
  {
    path: "index", component: IndexComponent, canActivate:[RolesGuard]
  },
  {
    path: "create" , component: CreateComponent, canActivate:[RolesGuard]
  },
  {
    path: "update/:id" , component: UpdateComponent, canActivate:[RolesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HocSinhRoutingModule {
  constructor(

    ){}
}
