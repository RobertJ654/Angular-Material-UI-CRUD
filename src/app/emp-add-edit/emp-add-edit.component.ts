import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit{

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  empForm: FormGroup;

  education: string[] = [
    'Egresado',
    'Titulado',
    'Maestría',
    'Doctorado'
  ]

  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private _coreService: CoreService
    ) {
    this.empForm = this._fb.group({
      firstName:  '',
      lastName: '',
      email: '',
      experience: '',
      date: '',
      gender: '',
      education: '',
      company: ''
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Información actualizada!', 'Terminar');
            this._dialogRef.close(true);
          }, error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Empleado agregado exitosamente', 'Terminar');
            this._dialogRef.close(true);
          }, error: (err: any) => {
            console.error(err);
          }
        })
      }
    }
  }

}
