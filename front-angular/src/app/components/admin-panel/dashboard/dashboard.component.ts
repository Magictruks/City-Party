import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    console.log(this.jwtService.jwtDecode(localStorage.getItem('currentUser')))
  }

}
