import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RessourcesService } from 'src/app/services/ressources.service';
import { map } from 'rxjs/operators';

import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.sass']
})
export class DialogUserComponent implements OnInit {

  roles: Roles[] = [
    {value: 'ROLE_USER', viewValue: 'User'},
    {value: 'ROLE_PROMOTER', viewValue: 'Promoter'}
  ];
  action: String
  user: User
  userForm: FormGroup
  firstnameCtrl: FormControl
  lastnameCtrl: FormControl
  addressCtrl: FormControl
  phoneNumberCtrl: FormControl
  emailCtrl: FormControl
  // eventsCtrl: FormControl
  rolesCtrl: FormControl
  passwordCtrl: FormControl
  loading: boolean = false
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
    this.user = this.data.data
    this.firstnameCtrl = fb.control(this.user.firstname, Validators.required)
    this.lastnameCtrl = fb.control(this.user.lastname, Validators.required)
    this.addressCtrl = fb.control(this.user.address, Validators.required)
    // this.phoneNumberCtrl = fb.control(this.user.phone_number, Validators.required)
    this.emailCtrl = fb.control(this.user.email, [Validators.required, Validators.email])
    this.rolesCtrl = fb.control(this.user.roles, Validators.required),
    this.passwordCtrl = fb.control(this.user.password, Validators.required)
    // this.eventsCtrl = fb.control(this.user.events)
    this.userForm = fb.group({
      firstname: this.firstnameCtrl,
      lastname: this.lastnameCtrl,
      address: this.addressCtrl,
      // phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      // events: this.eventsCtrl
      roles: this.rolesCtrl,
      password: this.passwordCtrl
    })
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
    this.user = this.data.data
    this.action = this.user.action
    delete this.user.action
    if(this.action === 'Delete') this.deleteAction = true
    console.log(this.user)
  }

  // isObject(val): boolean { return typeof val === 'object'; }

  // initForm() {
  //   this.userForm = new FormGroup({
  //     firstname: new FormControl(null, Validators.required),
  //     lastname: new FormControl(null, Validators.required),
  //     address: new FormControl(null, Validators.required),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     roles: new FormControl(null, Validators.required),
  //     password: new FormControl(null, Validators.required),
  //     latitude: new FormControl(),
  //     longitude: new FormControl()
  //   })
  // }

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
    this.userForm.value.roles = [this.userForm.value.roles]
    this.userForm.value.latitude = this.latitude
    this.userForm.value.longitude = this.longitude
    this.userForm.value.address = this.userForm.value.address.formatted_address
    console.log(this.userForm.value)
    this.loading = true
    this.ressourceService.post('user', this.userForm.value)
    .pipe(map(data => data as User))
    .subscribe(res => {
      console.log(res)
      res.phoneNumber = res.phone_number
      delete res.phone_number
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }


  edit() {
    this.userForm.value.roles = [this.userForm.value.roles]
    if (this.userForm.value.address.formatted_address) this.userForm.value.address = this.userForm.value.address.formatted_address
    if (this.latitude) this.userForm.value.latitude = this.latitude
    if (this.longitude) this.userForm.value.longitude = this.longitude
    console.log(this.userForm.value)
    this.loading = true
    this.ressourceService.edit('user', this.user.id, this.userForm.value)
    .pipe(map(data => data as User))
    .subscribe(res => {
      console.log(res)
      res.phoneNumber = res.phone_number
      delete res.phone_number
      this.dialogRef.close({event: this.action, data: res})
      this.loading = false
    })
  }

  delete() {
    this.deleteAction = false
    this.loading = true
    this.ressourceService.delete('user', this.user.id).subscribe(res => {
      this.dialogRef.close({event: this.action, data: this.user.id})
      this.loading = false
    })
  }

  cancel() {
    this.action = "Cancel"
    this.dialogRef.close({event: 'Cancel'})
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }


}
