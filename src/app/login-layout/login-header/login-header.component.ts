import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  search() {
      this.router.navigate(['search-user']);
  
  }

  ngOnInit() {
  }

}
