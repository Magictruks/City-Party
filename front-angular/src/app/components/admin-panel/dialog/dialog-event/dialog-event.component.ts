import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RessourcesService } from 'src/app/services/ressources.service';
import { EventModel } from 'src/app/models/events.model';

import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

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
  priceCtrl: FormControl
  loading: boolean = false
  loadingStart: boolean = false
  deleteAction: boolean = false
  //Google Maps Autocomplete
  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["FR"] 
    } 
  }
  public latitude: number;
  public longitude: number;

  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, private ressourceService: RessourcesService) {
    
    // this.event = this.data.data
    // this.labelCtrl = fb.control(this.event.label, Validators.required)
    // this.addressCtrl = fb.control(this.event.address, Validators.required)
    // this.contentCtrl = fb.control(this.event.content, Validators.required)
    // this.dateBeginEndAtCtrl = fb.control([this.event.date_begin_at, this.event.date_end_at], Validators.required)
    // this.promoterCtrl = fb.control(this.event.promoter, Validators.required)
    // this.categoryCtrl = fb.control(this.event.category, Validators.required)
    // this.priceCtrl = fb.control(this.event.price, Validators.required)
    // this.eventForm = fb.group({
    //   label: this.labelCtrl,
    //   address: this.addressCtrl,
    //   content: this.contentCtrl,
    //   dateBeginEndAt: this.dateBeginEndAtCtrl,
    //   user_id: this.promoterCtrl,
    //   category: this.categoryCtrl,
    //   price: this.priceCtrl,
    //   latitude: this.event.latitude,
    //   longitude: this.event.longitude
    // })
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {

// data coté serveur quand j'édite -4h
// created at edit chelou
// voir pour les category edit

    this.initForm()
    console.log('ici data')
    console.log(this.data)
    this.event = this.data.data
    this.action = this.data.action
    if(this.action === 'Edit') this.initEdit()
    if(this.action === 'Delete') this.deleteAction = true
    // this.action = this.event.action
    // delete this.event.action
    // if(this.action === 'Delete') this.deleteAction = true
    // console.log(this.event)
  }

  // isObject(val): boolean { return typeof val === 'object'; }

  initForm() {
    this.eventForm = new FormGroup({
      label : new FormControl(null, Validators.required),
      address : new FormControl(null, Validators.required),
      content : new FormControl(null, Validators.required),
      dateBeginEndAt : new FormControl(null, Validators.required),
      user_id : new FormControl(null, Validators.required),
      category : new FormControl(null, Validators.required),
      price : new FormControl(null, Validators.required),
      latitude : new FormControl(),
      longitude : new FormControl(),
    })

    this.ressourceService.getAll('user/promoters').subscribe(res => {
      console.log(res)
      this.selectedPromoter = ""
      this.promoters = res
      console.log('okok')
      console.log(this.promoters)
    }, error => console.log('error ici : ' + error))

    this.ressourceService.getAll('category').subscribe(res => {
      this.selectedCategories = ""
      this.categories = res
      console.log(this.categories)
    })
    this.loadingStart = true

  }

  initEdit() {
    this.ressourceService.getById('event', this.data.id).subscribe(event => {
      console.log(event)
      // this.event = this.data.data
      this.event = event
      console.log(typeof(this.event.category_id))
      console.log(this.event)
      this.eventForm.controls.label.setValue(this.event.label)
      this.eventForm.controls.address.setValue(this.event.address)
      this.eventForm.controls.content.setValue(this.event.content)
      this.eventForm.controls.dateBeginEndAt.setValue([this.event.date_begin_at, this.event.date_end_at])
      this.eventForm.controls.user_id.setValue(this.event.user_id)
      this.eventForm.controls.category.setValue(this.event.category_id)
      this.eventForm.controls.price.setValue(this.event.price)
      this.eventForm.controls.latitude.setValue(this.event.latitude)
      this.eventForm.controls.longitude.setValue(this.event.longitude)
      this.loadingStart = true
    })
  }

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
    // this.eventForm.value.user = "/api/user/" + this.eventForm.value.user
    console.log(new Date(this.eventForm.value.dateBeginEndAt[0]).toJSON().substring(0, this.eventForm.value.dateBeginEndAt[0].toJSON().length -1))
    this.eventForm.value.date_begin_at = this.formateDate(this.eventForm.value.dateBeginEndAt[0])
    this.eventForm.value.date_end_at = this.formateDate(this.eventForm.value.dateBeginEndAt[1])
    this.eventForm.value.latitude = this.latitude
    this.eventForm.value.longitude = this.longitude
    
    this.eventForm.value.address = this.eventForm.value.address.formatted_address
    delete this.eventForm.value.dateBeginEndAt
    console.log(this.eventForm.value)
    this.loading = true
    this.ressourceService.post('event', this.eventForm.value).subscribe(res => {
      console.log(res)
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }


  edit() {
    console.log('ici new date')
    console.log(this.eventForm.value.dateBeginEndAt[0])
    console.log(this.formateDate(this.eventForm.value.dateBeginEndAt[0]))
    // console.log(new Date(this.eventForm.value.dateBeginEndAt[0]).setHours(2))
    // console.log(new Date(new Date(this.eventForm.value.dateBeginEndAt[0])).toJSON())
    console.log(typeof(this.eventForm.value.dateBeginEndAt[0]) === 'string')
    console.log(this.event)
    this.eventForm.value.date_begin_at = this.formateDate(this.eventForm.value.dateBeginEndAt[0])
    this.eventForm.value.date_end_at = this.formateDate(this.eventForm.value.dateBeginEndAt[1])
    
    console.log(this.eventForm.value.address.formatted_address)
    console.log(this.eventForm.value.address)
    if (this.eventForm.value.address.formatted_address) this.eventForm.value.address = this.eventForm.value.address.formatted_address
    if (this.latitude) this.eventForm.value.latitude = this.latitude
    if (this.longitude) this.eventForm.value.longitude = this.longitude
    console.log(this.longitude)
    delete this.eventForm.value.dateBeginEndAt
    console.log(this.eventForm.value)
    this.loading = true
    this.ressourceService.edit('event', this.event.id, this.eventForm.value).subscribe(res => {
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }

  delete() {
    this.deleteAction = false
    this.loading = true
    this.ressourceService.delete('event', this.event.id).subscribe(res => {
      this.dialogRef.close({event: this.action, data: this.event.id})
      this.loading = false
    })
  }

  cancel() {
    this.action = "Cancel"
    this.dialogRef.close({event: 'Cancel'})
  }

  public AddressChange(address: any) { 
    this.addressCtrl=address.formatted_address
    this.event.address=address.formatted_address
    console.log(this.event.address)
    console.log(this.addressCtrl)
    console.log(address)
    console.log(address.geometry.location.lat())
    console.log(address.geometry.location.lng())
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  formateDate(date) {
    let newDate = new Date(date)
    let formatedDate = newDate.setHours(newDate.getHours() + 2)
    return new Date(formatedDate).toJSON().replace('Z', '')
  }

}
