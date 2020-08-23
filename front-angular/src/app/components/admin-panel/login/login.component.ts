import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup
  emailCtrl: FormControl
  passwordCtrl: FormControl
  loading: boolean = false
  currentUser: User

  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(user => this.currentUser = user)
    this.emailCtrl = fb.control('', [Validators.email, Validators.required])
    this.passwordCtrl = fb.control('', [Validators.required])
    this.userForm = fb.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  ngOnInit(): void {
    if(this.currentUser) {
      this.router.navigate(['/dashboard'])
    }
  }

  login() {
    this.loading = true
    this.authService.login(this.userForm.value).subscribe(
      res => {
        this.loading = false
        this.router.navigate(['/dashboard'])
      },
      error => {
        console.log(error)
        this.loading = false
      })
  }

}
