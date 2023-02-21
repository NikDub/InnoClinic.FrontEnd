import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogYesNoData } from '../../dialogYesNoData';

@Component({
  selector: 'app-yesNo',
  templateUrl: './yesNo.component.html',
  styleUrls: ['./yesNo.component.scss']
})
export class YesNoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<YesNoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogYesNoData) {
    if (data.dataForCheck == null) {
      this.dialogRef.close(false);
    }
  }

  ngOnInit() {}

  exit(state: boolean) {
    this.dialogRef.close(state);
  }
}
