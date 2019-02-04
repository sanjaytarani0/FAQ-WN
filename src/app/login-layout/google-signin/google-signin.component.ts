import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/services/data.service';
import { AppError } from 'src/app/common/errors/app-error';
import { NotFoundError } from 'src/app/common/errors/not-error-found';
import { GetPostsService } from 'src/app/services/get-posts.service';



@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss']
})
export class GoogleSigninComponent implements OnInit {

  constructor(private getPostsService:GetPostsService,private dataService:DataService) { }

  googleSigninForm() {
    window.location.href = environment.googleDriveAuthUrl;
  }

// posts;

//   public getpostss() {
//     this.getPostsService.getPosts().subscribe(
//       res => {
//         this.posts = res;
//         console.log(this.posts);
//       },
//       (error: AppError) => {
//         if(error instanceof NotFoundError)
//         alert("not found");
//         else
//         console.log(error);
//       });
//   }

clearLocalStorage() {
  localStorage.removeItem('isAuthCodeVerified');
  localStorage.removeItem('email');
  localStorage.removeItem('auth_token');
  localStorage.removeItem('ref_token');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('eth');
}

  ngOnInit() {
     this.clearLocalStorage();
  }

}
