import { Time } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeWithStatus } from 'src/app/shared/models/aggregation/DateWithTimeSlots';

@Component({
  selector: 'app-timePickerCustom',
  templateUrl: './timePickerCustom.component.html',
  styleUrls: ['./timePickerCustom.component.scss']
})
export class TimePickerCustomComponent implements OnInit {
  data: Array<TimeWithStatus>;
  duration: number;
  constructor(
    public dialogRef: MatDialogRef<TimePickerCustomComponent>,
    @Inject(MAT_DIALOG_DATA) public dataWithDuration: Array<any>
  ) {
    this.data = JSON.parse(JSON.stringify(dataWithDuration[0]));
    this.duration = dataWithDuration[1];

    for (let i = 1; i < this.data.length; i++) {
      if (!this.data[i].isFree && this.duration == 20) {
        this.data[i-1].isFree = false;
        continue;
      }
      if (!this.data[i].isFree && this.duration == 30) {
        this.data[i-1].isFree = this.data[i-2].isFree = false;
        continue;
      }
    }

    if(this.duration == 30) {
      this.data[this.data.length-1].isFree = this.data[this.data.length-2].isFree = false;
    }

    if(this.duration == 20) {
      this.data[this.data.length-1].isFree = false;
    }
  }

  ngOnInit() {}

  shortdate(time: Time): Date {
    return new Date(`2023-02-17T${time}`);
  }

  onNoClick(time: Time): void {
    this.dialogRef.close(time);
  }
}
