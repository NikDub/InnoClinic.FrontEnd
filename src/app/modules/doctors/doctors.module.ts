import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutes } from './doctors.routing';
import { DoctorsListComponent } from './components/doctorsList/doctorsList.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapModule } from "../../shared/modules/map/map.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
    declarations: [DoctorsListComponent],
    imports: [
        CommonModule,
        DoctorsRoutes,
        MatCardModule,
        MatGridListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MapModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class DoctorsModule {}
