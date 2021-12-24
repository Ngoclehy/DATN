import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main.component';
import { HehocComponent } from './hehoc.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  {
    path: "index", component: IndexComponent,
  },
  {
    path: "create" , component: CreateComponent,
  }, 
  {
    path: "update/:id" , component: UpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HehocRoutingModule {
  constructor(

    ){}
}
