import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { DateWithTimeSlots, TimeWithStatus } from 'src/app/shared/models/aggregation/DateWithTimeSlots';
import { InfoForCreateAppointment } from 'src/app/shared/models/aggregation/InfoForCreateAppointment';
import { Appointments } from 'src/app/shared/models/appointments/appointments';
import { Doctor } from 'src/app/shared/models/doctors/doctor';
import { Office } from 'src/app/shared/models/offices/Office';
import { Patient } from 'src/app/shared/models/patient/patient';
import { Service } from 'src/app/shared/models/services/service';
import { Specialization } from 'src/app/shared/models/services/specialization';
import { TimePickerCustomComponent } from 'src/app/shared/modules/timePickerCustom/timePickerCustom/timePickerCustom.component';
import { AggregatorsService } from 'src/app/shared/services/aggregators/aggregators.service';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { PatientService } from 'src/app/shared/services/profiles/patient.service';
import { ScheduleService } from 'src/app/shared/services/schedules/schedule.service';

@Component({
  selector: 'app-createAppointment',
  templateUrl: './createAppointment.component.html',
  styleUrls: ['./createAppointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
  myForm: FormGroup;
  scheduleService: ScheduleService;
  aggregatorsService: AggregatorsService;
  patientService: PatientService;

  specializationList: Array<Specialization>;
  filteredSpecializationList: Array<Specialization>;
  specializationListObservable: Observable<Specialization[]>;

  doctorList: Array<Doctor>;
  filteredDoctorList: Array<Doctor>;
  doctorListObservable: Observable<Doctor[]>;

  serviceList: Array<Service>;
  filteredServiceList: Array<Service>;
  serviceListObservable: Observable<Service[]>;

  officeList: Array<Office>;
  filteredOfficeList: Array<Office>;

  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  dateWithTimeSlots: Array<DateWithTimeSlots>;
  choosenTimeSlots: Array<TimeWithStatus>;
  isTimeDisabled = true;

  profilePatient: Patient;
  constructor(
    aggregatorsService: AggregatorsService,
    public dialog: MatDialog,
    scheduleService: ScheduleService,
    patientService: PatientService
  ) {
    this.aggregatorsService = aggregatorsService;
    this.scheduleService = scheduleService;
    this.patientService = patientService;
  }

  ngOnInit() {
    this.formInit();
    this.aggregatorsService.getInfoForCreateAppointment().subscribe(
      (res: InfoForCreateAppointment) => {
        this.filteredSpecializationList = this.specializationList = res.Specializations;
        this.filteredServiceList = this.serviceList = res.Services;
        this.filteredDoctorList = this.doctorList = res.DoctorsAtWork;
        this.filteredOfficeList = this.officeList = res.Offices;
      },
      err => console.log(err)
    );

    this.specializationListObservable = this.myForm.controls['specialization'].valueChanges.pipe(
      map(value => {
        if (typeof value === 'object') {
          this.myForm.controls['doctor'].enable();
          this.filteredDoctorList = this.doctorList.filter(d => d.specialization.id === value.id);
          (this.doctorListObservable as Subject<Doctor[]>).next(this.filteredDoctorList);
        }
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterForSpecialization(name as string) : this.filteredSpecializationList.slice();
      })
    );

    this.doctorListObservable = this.myForm.controls['doctor'].valueChanges.pipe(
      map(value => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          this.myForm.controls['service'].enable();
          const doctor = value as Doctor;
          this.filteredServiceList = this.serviceList.filter(s => s.specialization.id == doctor.specialization.id);
          (this.serviceListObservable as Subject<Service[]>).next(this.filteredServiceList);

          this.officeList = this.officeList.filter(s => s.id === doctor.officeId);

          this.aggregatorsService.getTimeSlots(doctor.id).subscribe(
            (res: Array<DateWithTimeSlots>) => {
              this.dateWithTimeSlots = res;
              this.myForm.controls['date'].enable();
            },
            err => console.log(err)
          );
        }
        const firstName = typeof value === 'string' ? value : value?.firstName;
        const middleName = typeof value === 'string' ? value : value?.middleName;
        const lastName = typeof value === 'string' ? value : value?.lastName;
        return firstName || middleName || lastName
          ? this._filterForDoctor(firstName as string, middleName as string, lastName as string)
          : this.filteredDoctorList.slice();
      })
    );

    this.serviceListObservable = this.myForm.controls['service'].valueChanges.pipe(
      map(value => {
        if (typeof value === 'object') {
          this.myForm.controls['office'].enable();
        }
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterForService(name as string) : this.filteredServiceList.slice();
      })
    );
  }

  private _filterForSpecialization(name: string): Specialization[] {
    const filterValue = name.toLowerCase();

    return this.filteredSpecializationList.filter(specializationList =>
      specializationList.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterForDoctor(firstName: string, middleName: string, lastName: string): Doctor[] {
    return this.filteredDoctorList.filter(
      doctorList =>
        doctorList.firstName.toLowerCase().includes(firstName.toLowerCase()) ||
        doctorList.middleName.toLowerCase().includes(middleName.toLowerCase()) ||
        doctorList.lastName.toLowerCase().includes(lastName.toLowerCase())
    );
  }

  private _filterForService(name: string): Service[] {
    const filterValue = name.toLowerCase();

    return this.filteredServiceList.filter(serviceList => serviceList.name.toLowerCase().includes(filterValue));
  }

  autocompleteStringValidatorForSpecialization(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.filteredSpecializationList?.indexOf(control.value) !== -1) {
        return null;
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }

  autocompleteStringValidatorForDoctor(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.filteredDoctorList?.indexOf(control.value) !== -1) {
        return null;
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }

  autocompleteStringValidatorForService(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.filteredServiceList?.indexOf(control.value) !== -1) {
        return null;
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }

  displaySpecialization(specialization: Specialization): string {
    return specialization && specialization.name ? specialization.name : '';
  }

  displayDoctor(doctor: Doctor): string {
    return doctor && doctor.firstName ? `${doctor.firstName} ${doctor.middleName} ${doctor.lastName}` : '';
  }

  displayService(service: Service): string {
    return service && service.name ? service.name : '';
  }

  filterDate = this.dateFilter.bind(this);

  dateFilter(date: Date) {
    if (this.dateWithTimeSlots != null) {
      const temp = this.dateWithTimeSlots.filter(
        (d: DateWithTimeSlots) => new Date(d.date).getDate() == date.getDate() && d.isFull == true
      );
      return temp.length == 0;
    } else return true;
  }

  chooseDate(event: MatDatepickerInputEvent<Date>) {
    this.isTimeDisabled = false;
    this.choosenTimeSlots = this.dateWithTimeSlots.filter(
      d => new Date(d.date).getDate() == event.value.getDate()
    )[0].timeWithStatuses;
  }

  openTimeDialog() {
    const duration = (this.myForm.controls['service'].value as Service).category.timeSlotSize;
    const dialog = this.dialog.open(TimePickerCustomComponent, {
      height: '350px',
      width: '600px',
      data: [this.choosenTimeSlots, duration]
    });

    dialog.afterClosed().subscribe(result => {
      this.isTimeDisabled = false;
      this.myForm.controls['time_slots'].setValue(result);
    });
  }

  formInit() {
    this.myForm = new FormGroup({
      specialization: new FormControl({ value: '', disabled: false }, [
        this.autocompleteStringValidatorForSpecialization(),
        Validators.required
      ]),
      doctor: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required])),
      service: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required])),
      office: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required])),
      date: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required])),
      time_slots: new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required]))
    });
  }

  submit() {
    this.patientService.getPatientProfile().subscribe(
      (res: Patient) => {
        this.profilePatient = res;
        const appointment: Appointments = {
          patientId: this.profilePatient.id,
          doctorId: this.myForm.controls['doctor'].value.id,
          serviceId: this.myForm.controls['service'].value.id,
          date: this.addDays(new Date(this.myForm.controls['date'].value), 1),
          time: this.myForm.controls['time_slots'].value,
          duration: (this.myForm.controls['service'].value as Service).category.timeSlotSize,
          serviceName: this.myForm.controls['service'].value.name,
          doctorFirstName: this.myForm.controls['doctor'].value.firstName,
          doctorLastName: this.myForm.controls['doctor'].value.lastName,
          doctorMiddleName: this.myForm.controls['doctor'].value.middleName,
          patientFirstName: this.profilePatient.firstName,
          patientLastName: this.profilePatient.lastName,
          patientMiddleName: this.profilePatient.middleName,
          status:null
        };

        this.scheduleService.createAppointment(appointment).subscribe(
          result => {
            console.log(result);
            this.dialog.closeAll();
          },
          err => console.log(err)
        );
        console.log(appointment);
      },
      err => console.log(err)
    );
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}
}
