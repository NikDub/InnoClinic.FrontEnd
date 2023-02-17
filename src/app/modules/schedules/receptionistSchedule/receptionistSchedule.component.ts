import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentWithPatientPhoneAndOffice } from 'src/app/shared/models/aggregation/AppointmentWithPatientPhoneAndOffice';
import { Office } from 'src/app/shared/models/offices/Office';
import { ScheduleService } from 'src/app/shared/services/schedules/schedule.service';

@Component({
  selector: 'app-receptionistSchedule',
  templateUrl: './receptionistSchedule.component.html',
  styleUrls: ['./receptionistSchedule.component.scss']
})
export class ReceptionistScheduleComponent implements OnInit {
  scheduleService: ScheduleService;
  isLoad = false;
  dataSource = new Array<AppointmentWithPatientPhoneAndOffice>();
  searchForm: FormGroup;
  matsort: MatTableDataSource<AppointmentWithPatientPhoneAndOffice>;
  displayedColumns: string[] = [
    'Time',
    'Doctor Full Name',
    'Patient Full Name',
    "Patient's phone number",
    'Service Name',
    'Status',
    'Approve',
    'Cancel',
    'ReSchedule'
  ];

  statusList = ['All', 'Approved', 'Not Approved'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  ngOnInit() {
    this.searchFormInit();
    this.scheduleService.getScheduleViewByReceptionist().subscribe(
      (res: Array<AppointmentWithPatientPhoneAndOffice>) => {
        this.dataSource = res;
        this.applyFilter();
        this.isLoad = true;
      },
      err => console.log(err)
    );
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      fullName: new FormControl(''),
      date: new FormControl(''),
      service: new FormControl(''),
      status: new FormControl(''),
      office: new FormControl('')
    });
    this.searchForm.get('date').setValue(new Date());
    this.applyFilter();
  }

  applyFilter() {
    let filteredData = this.dataSource;

    if (this.searchForm.value.fullName) {
      filteredData = filteredData.filter(r =>
        `${r.doctorFirstName} ${r.doctorMiddleName} ${r.doctorLastName}`
          .toLowerCase()
          .includes(this.searchForm.value.fullName.toLowerCase())
      );
    }

    if (this.searchForm.value.date) {
      const tempDate = new Array<AppointmentWithPatientPhoneAndOffice>();
      const date = new Date(this.searchForm.value.date);
      const stringDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      filteredData.forEach(f => {
        const dateF = new Date(f.date);
        const stringDateF = `${dateF.getFullYear()}-${dateF.getMonth()}-${dateF.getDate()}`;
        if (stringDate == stringDateF) {
          tempDate.push(f);
        }
      });
      filteredData = tempDate;
    }

    if (this.searchForm.value.service) {
      filteredData = filteredData.filter(r =>
        r.serviceName.toLowerCase().includes(this.searchForm.value.service.toLowerCase())
      );
    }

    if (this.searchForm.value.office) {
      filteredData = filteredData.filter(r =>
        `${r.office.city} ${r.office.status} ${r.office.houseNumber}`
          .toLowerCase()
          .includes(this.searchForm.value.office.toLowerCase())
      );
    }

    if (this.searchForm.value.status) {
      switch (this.searchForm.value.status) {
        case 'All':
          break;
        case 'Approved':
          filteredData = filteredData.filter(r => r.status == true);
          break;
        case 'Not Approved':
          filteredData = filteredData.filter(r => r.status == null);
          break;
        default:
          break;
      }
    }

    this.matsort = new MatTableDataSource(this.sortData(filteredData));
    this.matsort.sort = this.sort;
  }

  clearFilter() {
    this.searchForm.reset();
    this.matsort = new MatTableDataSource(this.sortData(this.dataSource));
    this.matsort.sort = this.sort;
  }

  sortData(data: Array<AppointmentWithPatientPhoneAndOffice>): Array<AppointmentWithPatientPhoneAndOffice> {
    data = data.sort((a, b) => {
      if (a.time !== b.time) {
        const date1 = new Date(`2022-01-01T${a.time}`);
        const date2 = new Date(`2022-01-01T${b.time}`);
        return date1 < date2 ? -1 : 1;
      } else if (a.doctorLastName !== b.doctorLastName) {
        return b.doctorLastName < a.doctorLastName ? -1 : 1;
      } else if (a.doctorFirstName !== b.doctorFirstName) {
        return b.doctorFirstName < a.doctorFirstName ? -1 : 1;
      } else if (a.serviceName !== b.serviceName) {
        return b.serviceName < a.serviceName ? -1 : 1;
      }

      return 0;
    });
    return data;
  }

  statusToText(status: boolean) {
    console.log(status);
    if (status == false) {
      return "Don't change";
    } else {
      return 'Approved';
    }
  }

  approveAppointmentStatus(appointment: AppointmentWithPatientPhoneAndOffice) {
    this.scheduleService.approveAppointment(appointment.id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  canceledAppointmentStatus(appointment: AppointmentWithPatientPhoneAndOffice) {
    this.scheduleService.canceledAppointment(appointment.id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  distinctOffices(): Array<Office> {
    let offices: Array<Office> = [];
    this.dataSource.forEach(r => {
      if (!offices.includes(r.office)) offices.push(r.office);
    });

    return offices;
  }

  distinctServices(): Array<any> {
    let services: Array<any> = [];
    this.dataSource.forEach(r => {
      if (!services.includes(r.serviceName)) services.push(r.serviceName);
    });
    return services;
  }

  addAppointment() {
    //TO DO
  }
  rescheduleApointment(elem: AppointmentWithPatientPhoneAndOffice) {
    //TO DO
  }
}
