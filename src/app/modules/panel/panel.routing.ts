import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/shared/enums/roles';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  { path: '**', component: PanelComponent, canActivate: [AuthGuard], data: { Roles: [Roles.Receptionist] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutes {}
