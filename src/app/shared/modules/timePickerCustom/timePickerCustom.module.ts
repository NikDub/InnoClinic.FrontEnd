import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerCustomComponent } from './timePickerCustom/timePickerCustom.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatButtonModule,
    MatGridListModule,
        CommonModule
  ],
  declarations: [TimePickerCustomComponent]
})
export class TimePickerCustomModule { }
