import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home' ,   loadChildren: () => import('./modules/home/home.module').then(m=>m.HomeModule)},
  { path: 'auth' , loadChildren: () => import('./modules/auth/auth.module').then(m=>m.AuthModule) },
  { path: 'error' , loadChildren: () => import('./modules/error-pages/errors.module').then(m=>m.ErrorsModule) },
  { path: '**' , redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
