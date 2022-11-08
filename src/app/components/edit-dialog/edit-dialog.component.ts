import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Survey} from "../../models/survey.model";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'MM-DD-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class EditDialogComponent implements OnInit {
  public surveyId: number | any;
  public editSurveyForm: FormGroup | any;
  public surveys: Survey[] | any;
  public survey: Survey | any;

  constructor(private dialogRef: MatDialogRef<EditDialogComponent>,
              private userService: UserService,
              private snackBar : MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {
                id: number,
                title: string,
                creator: string,
                start_date: Date,
                end_date: Date
              }) {
  }

  ngOnInit(): void {
    this.editSurveyForm = new FormGroup({
      'newEndDate': new FormControl('', Validators.required)
    });
  }


  public changeEndDate(): void {
    if (this.editSurveyForm.invalid) {
      return;
    } else {
      this.survey = new Survey(this.data.id, this.data.title, this.data.creator, this.data.start_date, this.editSurveyForm.controls['newEndDate'].value);

      this.userService.changeEndDateForSurvey(this.survey).subscribe( {
        next: (response:Survey) => {
          this.survey = response;
          this.snackBar.open('Successfully changed expiration date for survey', "OK", {duration: 2000})
        },
        error : () => alert("Something went wrong")
      });
      this.dialogRef.close(true);
    }
  }

  public closeDialog() {
    this.dialogRef.close(false);
    window.location.reload();
  }

}
