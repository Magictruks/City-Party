import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories } from 'src/app/models/categories.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-dialog-categories',
  templateUrl: './dialog-categories.component.html',
  styleUrls: ['./dialog-categories.component.sass']
})
export class DialogCategoriesComponent implements OnInit {

  action: String
  category: Categories
  categoryForm: FormGroup
  labelCtrl: FormControl
  eventsCtrl: FormControl
  loading: boolean = false
  deleteAction: boolean = false

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private ressourceService: RessourcesService) {
    this.category = this.data.data
    this.labelCtrl = fb.control(this.category.label, Validators.required)
    this.eventsCtrl = fb.control(this.category.events)
    this.categoryForm = fb.group({
      label: this.labelCtrl,
      events: this.eventsCtrl
    })
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    this.category = this.data.data
    this.action = this.category.action
    delete this.category.action
    if(this.action === 'Delete') this.deleteAction = true
    console.log(this.category)
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
    this.categoryForm.value.events = []
    this.loading = true
    this.ressourceService.post('category', this.categoryForm.value).subscribe(res => {
      console.log(res)
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }


  edit() {
    console.log(this.categoryForm.value)
    this.loading = true
    this.ressourceService.edit('category', this.category.id, this.categoryForm.value).subscribe(res => {
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }

  delete() {
    this.deleteAction = false
    this.loading = true
    this.ressourceService.delete('category', this.category.id).subscribe(res => {
      this.dialogRef.close({event: this.action, data: this.category.id})
      this.loading = false
    })
  }

  reset() {
    this.labelCtrl.setValue('')
  }

  cancel() {
    this.action = "Cancel"
    this.dialogRef.close({event: 'Cancel'})
  }

}
