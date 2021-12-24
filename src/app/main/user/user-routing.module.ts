import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisionComponent } from './permision/permision.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  {
    path: "index", component: IndexComponent,
  },
  {
    path: "create" , component: CreateComponent,
  }, {
    path: "update/:id" , component: UpdateComponent,
  },
  {
    path: "permision/:id" , component: PermisionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  constructor(

    ){}
}
