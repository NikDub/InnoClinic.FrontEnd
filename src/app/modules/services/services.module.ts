import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesRoutes } from './services.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { ServicesByCategoryComponent } from './components/servicesByCategory/servicesByCategory.component';
import { MatTableModule } from '@angular/material/table';
import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';
@NgModule({
  imports: [CommonModule, ServicesRoutes, MatTabsModule, MatTableModule, LoaderModule],
  declarations: [ServicesByCategoryComponent]
})
export class ServicesModule {}
