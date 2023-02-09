import { Component, Input, OnInit } from '@angular/core';
import { Office } from 'src/app/shared/models/offices/Office';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input('Office') office:Office;
  isShow:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  getOfficeAddress(office: Office) {
    return `${office.city}, ${office.street}, ${office.houseNumber}, office no.${office.officeNumber}`;
  }
}
