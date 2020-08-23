import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend-angular';
  currentUser: User

  constructor(private router: Router, private authService: AuthService){
    this.authService.currentUser.subscribe(user => this.currentUser = user)
    console.log(this.currentUser)
  }

  
}
