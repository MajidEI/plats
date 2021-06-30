import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ClientService } from '~services/client.service';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';
import { Client } from '~app/models/client';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit {
  public frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private clientService: ClientService,
    public snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      nom: new FormControl(IS_EDITING ? data.nom : null, [Validators.required, Validators.minLength(3)]),
      categorie: new FormControl(IS_EDITING ? data.categorie : null, [Validators.required, Validators.minLength(3)]),
      prix: new FormControl(IS_EDITING ? data.prix : null, [Validators.required, Validators.minLength(1)]),
      description: new FormControl(IS_EDITING ? data.description : null, [Validators.required]),
      image: new FormControl(IS_EDITING ? data.image : null, [Validators.required]),
      id: new FormControl(IS_EDITING ? data.id : null)
    });
  }

  public save(form: FormGroup) {
    this.clientService.save(form.value).subscribe((data: any) => {
      this.openSnack(data);
      this.dialogRef.close(true);
    });
  }

  public getErrorMessage() {
    return this.frm.controls.nom.hasError('required') ? 'Required' :
      this.frm.controls.nom.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }


  public getNErrorMessage() {
    return this.frm.controls.prix.hasError('required') ? 'Required' :
      this.frm.controls.prix.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  }

 

}
