import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorsWithPhotoAndOffice } from 'src/app/shared/models/doctors/doctorsWithPhotoAndOffice';
import { DoctorsService } from 'src/app/shared/services/profiles/doctors.service';

@Component({
  selector: 'app-doctorsList',
  templateUrl: './doctorsList.component.html',
  styleUrls: ['./doctorsList.component.scss']
})
export class DoctorsListComponent implements OnInit {
  doctorService: DoctorsService;
  dataSource = new Array<DoctorsWithPhotoAndOffice>();
  filteredData = new Array<DoctorsWithPhotoAndOffice>();
  searchForm: FormGroup;
  constructor(doctorService: DoctorsService) {
    this.doctorService = doctorService;
  }

  ngOnInit() {
    this.searchFormInit();
    this.doctorService.getDoctorsWithPhotoUrlAndOffice().subscribe(
      res => {
        this.dataSource = res as Array<DoctorsWithPhotoAndOffice>;
        this.filteredData = this.dataSource;
      },
      err => {
        console.log(err);
      }
    );
  }

  getExperience(careerStartYear: number) {
    return new Date().getFullYear() - careerStartYear + 1;
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      fullName: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      specialization: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      office: new FormControl('', Validators.pattern('^[a-zA-Z ]+$'))
    });
  }

  applyFilter() {
    this.filteredData = this.dataSource;

    if (this.searchForm.value.fullName.trim()) {
      this.filteredData = this.filteredData.filter(r =>
        `${r.firstName} ${r.middleName} ${r.lastName}`
          .toLowerCase().includes(this.searchForm.value.fullName.toLowerCase())
      );
    }

    if (this.searchForm.value.specialization.trim()) {
      this.filteredData = this.filteredData.filter(r =>
        r.specialization.name.toLowerCase().includes(this.searchForm.value.specialization.toLowerCase())
      );
    }

    if (this.searchForm.value.office.trim()) {
      this.filteredData = this.filteredData.filter(r =>
        `${r.office.city} ${r.office.status} ${r.office.houseNumber}`.toLowerCase().includes(this.searchForm.value.office.toLowerCase())
      );
    }
  }

  clearFilter(){
    this.searchForm.reset();
    this.filteredData = this.dataSource;
  }
}
