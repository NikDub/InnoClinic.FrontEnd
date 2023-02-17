import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Appointments } from 'src/app/shared/models/appointments/appointments';
import { Doctor } from 'src/app/shared/models/doctors/doctor';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { DoctorsService } from 'src/app/shared/services/profiles/doctors.service';
import { ScheduleService } from 'src/app/shared/services/schedules/schedule.service';

@Component({
  selector: 'app-doctorSchedule',
  templateUrl: './doctorSchedule.component.html',
  styleUrls: ['./doctorSchedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit {
  dataSource = new Array<Appointments>();
  filteredData = new Array<Appointments>();
  isLoad = false;
  scheduleService: ScheduleService;
  identityService: IdentityService;
  doctorService: DoctorsService;
  displayedColumns: string[] = ['Time', 'Patient Full Name', 'Service Name', 'Status', 'Result'];
  searchForm: FormGroup;

  constructor(scheduleService: ScheduleService, identityService: IdentityService, doctorService: DoctorsService) {
    this.scheduleService = scheduleService;
    this.identityService = identityService;
    this.doctorService = doctorService;
  }

  ngOnInit() {
    this.searchFormInit();
    this.doctorService.getDoctor(this.identityService.id$.value).subscribe(
      (res: Doctor) => {
        this.scheduleService.getScheduleViewByDoctor(res.id).subscribe(
          (res: Array<Appointments>) => {
            this.dataSource = res.sort((a, b) => (a.time < b.time ? -1 : 1));
            this.applyFilter();
            this.isLoad = true;
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  statusToText(status: boolean) {
    if (status == null) {
      return "Not approved";
    } else if (status) {
      return 'Approved';
    }
    return 'Canceled';
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      date: new FormControl('')
    });
    this.searchForm.get('date').setValue(new Date());
    this.applyFilter();
  }

  applyFilter() {
    this.filteredData = this.dataSource;

    if (this.searchForm.value.date) {
      this.filteredData = this.filteredData.filter(r => r.date == this.searchForm.value.date);
    }
    this.filteredData = this.filteredData.sort((a, b) => (a.time < b.time ? -1 : 1));
  }

  clearFilter() {
    this.searchForm.reset();
    this.filteredData = this.dataSource.sort((a, b) => (a.time < b.time ? -1 : 1));

  }

  viewResult(){}

  viewPatientProfile(){}

}
