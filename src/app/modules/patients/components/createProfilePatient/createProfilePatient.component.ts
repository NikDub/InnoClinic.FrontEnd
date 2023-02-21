import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientForCreatedAggregated } from 'src/app/shared/models/aggregation/patientForCreatedAggregated';
import { Patient } from 'src/app/shared/models/patient/patient';
import { PatientForMatch } from 'src/app/shared/models/patient/patientForMatch';
import { YesNoComponent } from 'src/app/shared/modules/dialog/components/yesNo/yesNo.component';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { PatientService } from 'src/app/shared/services/profiles/patient.service';

@Component({
  selector: 'app-createProfilePatient',
  templateUrl: './createProfilePatient.component.html',
  styleUrls: ['./createProfilePatient.component.scss']
})
export class CreateProfilePatientComponent implements OnInit {
  myForm: FormGroup;
  srcResult: any;

  constructor(
    private patientService: PatientService,
    private identityService: IdentityService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      photo: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }

  submit() {
    const patientForMatch: PatientForMatch = {
      firstName: this.myForm.value.firstName,
      middleName: this.myForm.value.middleName,
      lastName: this.myForm.value.lastName,
      dateOfBirth: this.myForm.value.dateOfBirth
    };
    this.patientService.checkPatientProfile(patientForMatch).subscribe(
      (res: Patient) => {
        const dialogYesNo = this.dialog.open(YesNoComponent, {
          width: '500px',
          data: {
            title: 'Similar profile',
            message: 'A similar profile has been found, you might have already visited one of our clinics?',
            noText: "No, it's not me",
            yesText: "Yes, it's me",
            dataForCheck: res
          }
        });

        dialogYesNo.afterClosed().subscribe((yes: any) => {
          if (yes == true) {
            this.createPatientIfExist(res);
          } else {
            this.createPatient();
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  createPatient() {
    const patient: PatientForCreatedAggregated = {
      accountId: this.identityService.id$.value,
      photo: {
        Value: btoa(new Uint8Array(this.srcResult).reduce((data, byte) => data + String.fromCharCode(byte), '')),
        FileName: this.myForm.value.photo
      },
      firstName: this.myForm.value.firstName,
      middleName: this.myForm.value.middleName,
      lastName: this.myForm.value.lastName,
      accountPhoneNumber: ""+this.myForm.value.phone,
      dateOfBirth: this.myForm.value.dateOfBirth
    };

    this.patientService.createPatientProfile(patient).subscribe(
      (res: any) => {
          this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  createPatientIfExist(patient: Patient) {
    const patientModel: PatientForCreatedAggregated = {
      accountId: this.identityService.id$.value,
      photo: {
        Value: btoa(new Uint8Array(this.srcResult).reduce((data, byte) => data + String.fromCharCode(byte), '')),
        FileName: this.myForm.value.photo
      },
      firstName: patient.firstName,
      middleName: patient.middleName,
      lastName: patient.lastName,
      accountPhoneNumber: ""+this.myForm.value.phone,
      dateOfBirth: patient.dateOfBirth
    };

    this.patientService.createPatientProfile(patientModel).subscribe(
      (res: any) => {
          this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

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
    let inputNode: any = document.querySelector('#file');
    inputNode.value = null;
  }
}
