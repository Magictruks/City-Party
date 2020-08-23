import { Component, OnInit, Inject } from '@angular/core';
import { Promoter } from 'src/app/models/promoters.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-dialog-promoter',
  templateUrl: './dialog-promoter.component.html',
  styleUrls: ['./dialog-promoter.component.sass']
})
export class DialogPromoterComponent implements OnInit {

  action: String
  promoter: Promoter
  promoterForm: FormGroup
  nameCtrl: FormControl
  addressCtrl: FormControl
  phoneNumberCtrl: FormControl
  emailCtrl: FormControl
  eventsCtrl: FormControl
  loading: boolean = false
  deleteAction: boolean = false

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private ressourceService: RessourcesService) {
    this.promoter = this.data.data
    this.nameCtrl = fb.control(this.promoter.name, Validators.required)
    this.addressCtrl = fb.control(this.promoter.address, Validators.required)
    this.phoneNumberCtrl = fb.control(this.promoter.phoneNumber, Validators.required)
    this.emailCtrl = fb.control(this.promoter.email, Validators.required)
    this.eventsCtrl = fb.control(this.promoter.events)
    this.promoterForm = fb.group({
      name: this.nameCtrl,
      address: this.addressCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      events: this.eventsCtrl
    })
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    this.promoter = this.data.data
    this.action = this.promoter.action
    delete this.promoter.action
    if(this.action === 'Delete') this.deleteAction = true
    console.log(this.promoter)
  }

  // isObject(val): boolean { return typeof val === 'object'; }

  submit() {
    if(this.action === 'Add') {
      this.add()
    } else if(this.action === 'Edit') {
      this.edit()
    } else if(this.action === 'Delete') {
      this.delete()
    }
  }

  add() {
    this.promoterForm.value.events = []
    this.loading = true
    this.ressourceService.post('promoters', this.promoterForm.value).subscribe(res => {
      console.log(res)
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }


  edit() {
    console.log(this.promoterForm.value)
    this.loading = true
    this.ressourceService.edit('promoters', this.promoter.id, this.promoterForm.value).subscribe(res => {
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }

  delete() {
    this.deleteAction = false
    this.loading = true
    this.ressourceService.delete('promoters', this.promoter.id).subscribe(res => {
      this.dialogRef.close({event: this.action, data: this.promoter.id})
      this.loading = false
    })
  }

  cancel() {
    this.action = "Cancel"
    this.dialogRef.close({event: 'Cancel'})
  }

}
