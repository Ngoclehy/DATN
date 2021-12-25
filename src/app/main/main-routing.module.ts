import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  {
    path: "", component: MainComponent, children:[
      { path: "404", component: NotFoundComponent },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      } ,
      {
        path: 'hehoc',
        loadChildren: () => import('./hehoc/hehoc.module').then(m => m.HehocModule)
      },
      {
        path: 'hocsinh',
        loadChildren: () => import('./hocsinh/hocsinh.module').then(m => m.HocsinhModule)
      },

      {
        path: 'giaovien',
        loadChildren: () => import('./giaovien/giaovien.module').then(m => m.GiaovienModule)
      },
      {
        path: 'permision',
        loadChildren: () => import('./permision/permision.module').then(m => m.PermisionModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'lophoc',
        loadChildren: () => import('./lophoc/lophoc.module').then(m => m.LophocModule)
      },
      {
        path: 'khoanthu',
        loadChildren: () => import('./khoanthu/khoanthu.module').then(m => m.KhoanthuModule)
      },
      {
        path: 'phieuthu',
        loadChildren: () => import('./phieuthu/phieuthu.module').then(m => m.PhieuthuModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
