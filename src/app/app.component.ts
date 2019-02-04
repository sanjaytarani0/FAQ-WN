import { Component } from '@angular/core';
declare var $:any;

export function getToken() {
  return localStorage.getItem('access_token');
 }
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Q-Connect';


}
