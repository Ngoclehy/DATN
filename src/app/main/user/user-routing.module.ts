import { RolesGuard } from 'src/app/core/guard/roles.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisionComponent } from './permision/permision.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [RolesGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [RolesGuard],
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    canActivate: [RolesGuard],
  },
  {
    path: 'permision/:id',
    component: PermisionComponent,
    canActivate: [RolesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
  constructor() {}
}
