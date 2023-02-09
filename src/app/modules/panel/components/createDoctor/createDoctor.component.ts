import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { DoctorStatus } from 'src/app/shared/enums/status';
import { Office } from 'src/app/shared/models/offices/Office';
import { Specialization } from 'src/app/shared/models/services/specialization';
import { OfficesService } from 'src/app/shared/services/offices/offices.service';
import { SpecializationsService } from 'src/app/shared/services/services/specializations.service';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { checkEmailInSystemValidator } from 'src/app/shared/asyncvalidators/asyncValidators';
import { DoctorForCreatedAggregated } from 'src/app/shared/models/aggregation/doctorForCreatedAggregated';
import { AggregatorsService } from 'src/app/shared/services/aggregators/aggregators.service';

@Component({
  selector: 'app-createDoctor',
  templateUrl: './createDoctor.component.html',
  styleUrls: ['./createDoctor.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class CreateDoctorComponent implements OnInit {
  minDate = new Date(new Date().getFullYear() - 40, 0, 1);
  maxDate = new Date();
  myForm: FormGroup;
  specializationList: Array<Specialization> = [];
  officeList: Array<Office>;
  statusList: Array<DoctorStatus> = Object.values(DoctorStatus);
  filteredOptions: Observable<Specialization[]>;
  srcResult: any;
  officeService: OfficesService;
  specializationService: SpecializationsService;
  identityService: IdentityService;
  aggregatorsService: AggregatorsService;

  constructor(
    officeService: OfficesService,
    specializationService: SpecializationsService,
    identityService: IdentityService,
    aggregatorsService: AggregatorsService
  ) {
    this.officeService = officeService;
    this.specializationService = specializationService;
    this.identityService = identityService;
    this.aggregatorsService = aggregatorsService;
  }

  autocompleteStringValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.specializationList.indexOf(control.value) !== -1) {
        return null;
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      photo: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      email: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
        asyncValidators: [checkEmailInSystemValidator(this.identityService)]
      }),
      specialization: new FormControl(
        '',
        Validators.compose([Validators.required, this.autocompleteStringValidator()])
      ),
      office: new FormControl('', Validators.required),
      careerStratYear: new FormControl('', Validators.required),
      status: new FormControl('At Work', Validators.required)
    });
    this.officeService.get().subscribe(
      (res: any) => {
        this.officeList = res as Array<Office>;
      },
      err => {
        console.log(err);
      }
    );

    this.specializationService.get().subscribe(
      (res: any) => {
        this.specializationList = res as Array<Specialization>;
      },
      err => {
        console.log(err);
      }
    );

    this.filteredOptions = this.myForm.controls['specialization'].valueChanges.pipe(
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.specializationList.slice();
      })
    );
  }

  displayFn(specialization: Specialization): string {
    return specialization && specialization.name ? specialization.name : '';
  }
  private _filter(name: string): Specialization[] {
    const filterValue = name.toLowerCase();

    return this.specializationList.filter(specializationList =>
      specializationList.name.toLowerCase().includes(filterValue)
    );
  }

  submit() {
    var date: Date = moment(this.myForm.value.dateOfBirth, 'DD/MM/yyyy').toDate();
    var modelForSend: DoctorForCreatedAggregated = {
      FirstName: this.myForm.value.firstName,
      LastName: this.myForm.value.lastName,
      MiddleName: this.myForm.value.middleName,
      DateOfBirth: date,
      CareerStartYear: this.myForm.value.careerStratYear,
      SpecializationId: this.myForm.value.specialization.id,
      Status: { Name: this.myForm.value.status.replaceAll(" ", "") },
      OfficeId: this.myForm.value.office.id,
      Email: this.myForm.value.email,
      Photo: {
        FileName: this.myForm.value.photo,
        Value: btoa(
          new Uint8Array(this.srcResult).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      }
    };
    this.aggregatorsService.CreateDoctor(modelForSend).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
      this.myForm.get('photo').setValue(inputNode.files[0].name);
    }
  }

  clearFileSelected() {
    this.srcResult = null;
    this.myForm.get('photo').setValue('');
    var inputNode: any = document.querySelector('#file');
    inputNode.value = null;
  }

  chooseYear(year: any, datepicker: any) {
    var tempDate = Number(JSON.stringify(year).replace('"', '').split('-')[0]) + 1;
    this.myForm.get('careerStratYear').setValue(tempDate.toString());
    datepicker.close();
  }
}
