import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Http,Headers } from '@angular/http';
import { AuthService } from 'src/app/services/auth.service';
import { AppError } from 'src/app/common/errors/app-error';

declare var $:any;
declare var Web3: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  id;
  isLoading:boolean;
  headers;
  userEmail;
  googleAccessToken;
  googleRefreshToken;
  gmailDetails;
  driveFile = {
    userId: '',
    ETH: {
      address: '',
      utcFile: ''
    }
  };

  utcFileName;
  ethAddress;
  

  constructor(private http:Http, private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute) {

   }


  search() {
      this.router.navigate(['/layout/search']);
  }

  copyText(val: string){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

    createAddress() {
      var web3 = new Web3(new Web3.providers.HttpProvider(environment.transferWeb3ApiUrl));
      const account = web3.eth.accounts.create();
      const etherAddress = account.address;
      localStorage.setItem('eth', etherAddress);
      const privateKey = account.privateKey;
      const keyObject = web3.eth.accounts.encrypt(privateKey, environment.transferPassword);
      const utcContent = JSON.stringify(keyObject);
      const date = new Date().toISOString();
      const fileName = "UTC--" + date + "--" + keyObject.address;
      this.utcFileName = fileName;
      this.driveFile.ETH.address = etherAddress;
      this.ethAddress = etherAddress;
      this.driveFile.ETH.utcFile = utcContent;
      console.log(this.driveFile);
      this.uploadFile();
    }

    uploadFile() {
      var fileContent = JSON.stringify(this.driveFile);
      var file = new Blob([fileContent], { type: 'text/plain' });
      var metadata = {
        'name': this.utcFileName,
        'mimeType': 'text/plain',
        'parents': ['appDataFolder']
      };

      var accessToken = this.googleAccessToken;
      var form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      var xhr = new XMLHttpRequest();
      xhr.open('post', environment.googleDriveFileUploadUrl);
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.responseType = 'json';
      xhr.onload = () => {
        // console.log(xhr.response.id); // Retrieve uploaded file ID.
      };
      xhr.send(form);
      this.newUserLogin();
    }

    newUserLogin() {
      let newUserData = {
        email: this.gmailDetails.email,
        msgStatus: true,
        status: true,
        refreshToken: this.googleRefreshToken,
        etherAddress: this.driveFile.ETH.address
      }

      let  headers = {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }

      let url = "v1/usercreate";
      this.http.post(environment.apiBaseUrl + url , newUserData, headers).subscribe(
        res => {
            // console.log(res);
            this.login(this.gmailDetails.email);
        },
        (error:AppError) => {

        }
      )

      // this.addUserEthAddressService.create(newEthAddressData).subscribe(res => {
      //   this.login(this.userEmail);
      // },
      //   error => {
      //     console.log(error);
      //   });
    }

    login(email) {
      this.isLoading = true;
      this.authService.login(email).subscribe(
        res => {
          let data:any = res;
          if(data.msg == "No Records"){
            this.createAddress();
          }
          else {
              this.ethAddress = data.data[0].etherAddress;
              this.id = data.data[0]._id;
              localStorage.setItem('eth', this.ethAddress);
              localStorage.setItem('id', this.id);
              this.isLoading = false;
          }          
        },
        (error: AppError) => {
            this.isLoading = false;
        })
    }

    getGoogleAccessAndRefreshToken(authCode) {
      this.isLoading = true;
      let code = authCode;
      let client_id = environment.googleClientId;
      let client_secret = environment.googleClientSecret;
      let redirect_uri = environment.googleRedirectUri;
      let grant_type = "authorization_code";
  
      let gurl = "code=" + code + "&client_id=" + client_id + "&client_secret=" + client_secret + "&redirect_uri=" + redirect_uri + "&grant_type=" + grant_type;
  
      this.headers = {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }
  
      let url = environment.getGoogleAccessToken;
  
      this.http.post(url, gurl, this.headers).subscribe(res => {
      
        let data = res.json();
        this.googleAccessToken = data.access_token;
        this.googleRefreshToken = data.refresh_token;
        let gmailUrl = environment.getGmailDetailsUrl;
  
        this.http.get(gmailUrl + this.googleAccessToken, this.headers).subscribe(res => {
          this.gmailDetails = res.json();
          this.driveFile.userId = this.gmailDetails.email;
          this.userEmail = this.gmailDetails.email;
          localStorage.setItem('email', this.userEmail);
          localStorage.setItem('isAuthCodeVerified',"true");
          this.login(this.userEmail);
        },
          error => {
            console.log(error);
            this.isLoading = false;
          });
      });
    }

    logout() {
      localStorage.removeItem('isAuthCodeVerified');
      localStorage.removeItem('email');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('ref_token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('eth');
      this.router.navigate(['/login']);

    }

    ngOnInit() {
      // $("#securityModal").modal('show');

      this.activatedRoute.queryParams.subscribe(res => {
        let authorizationcode = res['code'];
        let driveAccessDisagree = res['error'];
  
        if(driveAccessDisagree != null) {
          this.router.navigate(['/']);
          return false;
        }
  
        else {
          let isVerified = localStorage.getItem('isAuthCodeVerified');
          if(isVerified == null)
          {
          if (authorizationcode != undefined) {
            this.getGoogleAccessAndRefreshToken(authorizationcode);
          }
          else {
            this.userEmail = localStorage.getItem('email');
            this.login(this.userEmail);
          }
        }
          else {
            this.userEmail = localStorage.getItem('email');
            this.login(this.userEmail);
          }
        }
      });

     }


}
