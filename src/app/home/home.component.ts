import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = 'IntERnshala';

  amount = 3922.123;

  dob = new Date();
  constructor() { }

  ngOnInit() {
  }

}
