import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutes } from './services.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { ServicesByCategoryComponent } from './components/servicesByCategory/servicesByCategory.component';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [CommonModule, ServicesRoutes, MatTabsModule, MatTableModule],
  declarations: [ServicesByCategoryComponent]
})
export class ServicesModule {}
