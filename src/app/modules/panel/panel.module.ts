import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { PanelRoutes } from './panel.routing';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateDoctorComponent } from './components/createDoctor/createDoctor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DatepickerOnlyYearDirective } from 'src/app/shared/derectives/datepickerOnlyYear.directive';
@NgModule({
    declarations: [PanelComponent, CreateDoctorComponent, DatepickerOnlyYearDirective],
    imports: [
        CommonModule,
        PanelRoutes,
        MatButtonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatMomentDateModule,
    ]
})
export class PanelModule {}
