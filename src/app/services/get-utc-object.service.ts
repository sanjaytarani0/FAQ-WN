import { Injectable } from '@angular/core';
import { GetGoogleRefreshTokenService } from './get-google-refresh-token.service';
import { environment } from './../../environments/environment';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetUtcObjectService {

  googleHeaders;
  googleDriveHeaders;
  googleRefreshTokenData;
  

  constructor(private http:Http,private getGoogleRefreshTokenService:GetGoogleRefreshTokenService) { }

  fromAddress;
  toAddress;
  value;



  getUtcKeyObject() {
   
      let id = localStorage.getItem('id');
      this.getGoogleRefreshTokenService.getGoogleRefreshToken(id).
      subscribe(res => {
      this.googleRefreshTokenData = res;
      let googleRefreshToken = this.googleRefreshTokenData.data.refreshToken;
      this.getGoogleAccessToken(googleRefreshToken);
     },
     error => {

     });
    }




    getGoogleAccessToken(googleRefreshToken) {
      let client_id = environment.googleClientId;
      let client_secret = environment.googleClientSecret;

      let gmailUrl = "client_id=" + client_id + "&client_secret=" + client_secret + "&refresh_token=" + googleRefreshToken + "&grant_type=refresh_token";

      this.googleHeaders = {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

      let url = environment.getGoogleAccessToken;
      this.http.post(url, gmailUrl, this.googleHeaders).subscribe(res => {

        var accessTokendata = res.json();
        let googleAccessToken = accessTokendata.access_token;
         this.getGoogleDriveFiles(googleAccessToken);
      },
      error => {

      });
    }




    getGoogleDriveFiles(googleAccessToken) {
      this.googleDriveHeaders = {
        headers: new Headers({
          'Authorization': 'Bearer ' + googleAccessToken
        })
      }
      this.http.get(environment.getGoogleDriveFiles, this.googleDriveHeaders).subscribe(res => {
        let filesData = res.json();
        let allFiles = filesData.items;
        let fileId = allFiles[0].id;

         this.getUtcKeyObjectData(fileId);
      },
      error => {

      });
    }


    getUtcKeyObjectData(fileId) {
     
        this.http.get(environment.getGoogleDriveFiles + '/' + fileId + '?alt=media', this.googleDriveHeaders).subscribe(res => {
        let keyFileData = res.json();
        let utcKeyObject = keyFileData.ETH.utcFile;
 
      });
    }

  

      
  
}