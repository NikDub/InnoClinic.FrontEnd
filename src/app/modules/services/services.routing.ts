import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesByCategoryComponent } from './components/servicesByCategory/servicesByCategory.component';

const routes: Routes = [
  { path: 'category', component: ServicesByCategoryComponent},
  { path: '**', redirectTo: 'category' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutes {}
