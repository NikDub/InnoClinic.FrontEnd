import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/shared/services/services/services.service';

@Component({
  selector: 'app-servicesByCategory',
  templateUrl: './servicesByCategory.component.html',
  styleUrls: ['./servicesByCategory.component.scss']
})
export class ServicesByCategoryComponent implements OnInit {
  data: any;
  displayedColumns: string[] = ['name', 'price'];
  services: ServicesService;
  constructor(services: ServicesService) {
    this.services = services;
  }

  ngOnInit() {
    this.services.getByCategory().subscribe(
      res => {
        this.data = res;
        let map = new Map<any[string], string[]>();
        this.data.consultations.forEach((item: any) => {
          let itemKey = item.specialization.name;
          if (!map.has(itemKey)) {
            map.set(
              itemKey,
              this.data.consultations.filter((i: any) => i.specialization.name === item.specialization.name)
            );
          }
        });
        this.data.consultations = map;
      },
      err => console.log(err)
    );
  }
}
