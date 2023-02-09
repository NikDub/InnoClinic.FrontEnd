import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDoctorComponent } from '../createDoctor/createDoctor.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openCreatePatient() {
    this.dialog.closeAll();
    this.dialog.open(CreateDoctorComponent, {
      height: '900px',
      width: '500px'
    });
  }
}
