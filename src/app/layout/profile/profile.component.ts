import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() childMsg: string;
  
  currentUrl;

  constructor(private router:Router) { }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  showQrCode() {
      $("#qrModal").modal('show');
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }


}
