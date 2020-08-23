import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RessourcesService } from 'src/app/services/ressources.service';
import { EventModel } from 'src/app/models/events.model';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.sass']
})
export class DialogEventComponent implements OnInit {

  dt1: any
  promoters: Object
  categories: Object
  selectedPromoter: any
  selectedCategories: any
  action: String
  event: EventModel
  eventForm: FormGroup
  labelCtrl: FormControl
  addressCtrl: FormControl
  contentCtrl: FormControl
  dateBeginEndAtCtrl: FormControl
  promoterCtrl: FormControl
  categoryCtrl: FormControl
  loading: boolean = false
  deleteAction: boolean = false
  //Google Maps Autocomplete
  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["FR"] 
    } 
  } 

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private ressourceService: RessourcesService) {
    this.ressourceService.getAll('promoters').subscribe(res => {
      console.log(res)
      this.selectedPromoter = ""
      this.promoters = res
      console.log('okok')
      console.log(this.promoters)
    })
    this.ressourceService.getAll('categories').subscribe(res => {
      this.selectedCategories = ""
      this.categories = res['hydra:member']
      console.log(this.categories)
    })
    this.event = this.data.data
    this.labelCtrl = fb.control(this.event.label, Validators.required)
    this.addressCtrl = fb.control(this.event.address, Validators.required)
    this.contentCtrl = fb.control(this.event.content, Validators.required)
    this.dateBeginEndAtCtrl = fb.control([this.event.dateBeginAt, this.event.dateEndAt], Validators.required)
    this.promoterCtrl = fb.control(this.event.promoter, Validators.required)
    this.categoryCtrl = fb.control(this.event.category, Validators.required)
    this.eventForm = fb.group({
      label: this.labelCtrl,
      address: this.addressCtrl,
      content: this.contentCtrl,
      dateBeginEndAt: this.dateBeginEndAtCtrl,
      promoter: this.promoterCtrl,
      category: this.categoryCtrl
    })
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    this.event = this.data.data
    this.action = this.event.action
    delete this.event.action
    if(this.action === 'Delete') this.deleteAction = true
    console.log(this.event)
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
    this.eventForm.value.dateBeginAt = this.eventForm.value.dateBeginEndAt[0]
    this.eventForm.value.dateEndAt = this.eventForm.value.dateBeginEndAt[1]
    delete this.eventForm.value.dateBeginEndAt
    console.log(this.eventForm.value)
    this.loading = true
    this.ressourceService.post('events', this.eventForm.value).subscribe(res => {
      console.log(res)
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }


  edit() {
    console.log(this.eventForm.value)
    this.loading = true
    this.ressourceService.edit('events', this.event.id, this.eventForm.value).subscribe(res => {
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }

  delete() {
    this.deleteAction = false
    this.loading = true
    this.ressourceService.delete('events', this.event.id).subscribe(res => {
      this.dialogRef.close({event: this.action, data: this.event.id})
      this.loading = false
    })
  }

  cancel() {
    this.action = "Cancel"
    this.dialogRef.close({event: 'Cancel'})
  }

  public AddressChange(address: any) { 
    this.event.address=address.formatted_address 
    console.log(address.geometry.location.lat)
  } 

}
