import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../ui/header/header.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
