import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { toAddressValidators } from 'src/app/common/validators/to-address.validators';
import { AppError } from 'src/app/common/errors/app-error';
import { GetUserTokensService } from 'src/app/services/get-user-tokens.service';
import { DataService } from 'src/app/services/data.service';
import { GetGoogleRefreshTokenService } from 'src/app/services/get-google-refresh-token.service';
import { environment } from './../../../../environments/environment';
import { Http,Headers } from '@angular/http';
import { GetEtherAddressFromEmailService } from 'src/app/services/get-ether-address-from-email.service';




declare var Web3: any;
declare var $: any;
let web3 = new Web3(new Web3.providers.HttpProvider(environment.transferWeb3ApiUrl));

@Component({
  selector: 'app-send-crypto',
  templateUrl: './send-crypto.component.html',
  styleUrls: ['./send-crypto.component.scss']
})

export class SendCryptoComponent implements OnInit {

  userTokensList;
  selectedToken = 'ETH';


  transferForm = new FormGroup({
    toAddress: new FormControl('',[ Validators.required,
    toAddressValidators.checkValidAddress ]),
    amount: new FormControl('',[Validators.required,
    Validators.pattern('^[0-9]+(\.[0-9]{1,8})?$')]),
    token: new FormControl('ETH')
  });

  sendCryptoFormModel = {
    FromAddress:'',
    ToAddress:'',
    Value:0
  }

  isLoading:boolean;

  constructor(private getEtherAddressFromEmailService:GetEtherAddressFromEmailService, private http:Http, private getUserTokensService:GetUserTokensService, private dataService:DataService,private getGoogleRefreshTokenService:GetGoogleRefreshTokenService) { 

  }
  
  get toAddress() {
    return this.transferForm.get('toAddress');   
  }

  get amount() {
    return this.transferForm.get('amount');
  }

  changeTokenIcon(token) {
    this.selectedToken = token;
    let selectedTokenData = this.userTokensList.find(userToken => userToken.symbol == token)
    this.contractAddress = selectedTokenData.contractAdd;
  }

  transfer() {
    this.selectedToken = (this.transferForm.get('token').value);
    this.isLoading = true;
    let eth = localStorage.getItem('eth');
    var fromAddress = eth;
    var toAddress;
    var value = this.amount.value;

    let checkAddress = this.toAddress.value.toString();
    checkAddress = checkAddress.trim();
    checkAddress = checkAddress.slice(-10);

    if(checkAddress == "@gmail.com") {
      toAddress = this.toAddress.value;
      this.sendCryptoFormModel.FromAddress = fromAddress;
      this.sendCryptoFormModel.ToAddress = toAddress;
      this.sendCryptoFormModel.Value = value;

      this.getEtherAddressFromEmailService.getEtherAddrssFromEmail(toAddress).subscribe(
        res => {
           let result:any = res;
           toAddress = result.data;
           this.sendCryptoFormModel.ToAddress = result.data;
           this.getGoogleRefreshToken();
        },
      (error:AppError) => {

      });
    }
    else {
      toAddress = this.toAddress.value;
      this.sendCryptoFormModel.FromAddress = fromAddress;
      this.sendCryptoFormModel.ToAddress = toAddress;
      this.sendCryptoFormModel.Value = value;
      this.getGoogleRefreshToken();
    }
  }


  // get UTC credentials functions block

  googleRefreshTokenData;
  googleHeaders;
  googleDriveHeaders;
  contractAddress;
  successMsg;
  errorMsg;

  getGoogleRefreshToken() {
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
    this.http.get(environment.getGoogleDriveFiles + '/' + fileId + '?alt=media', this.googleDriveHeaders).subscribe(
      res => {
        let keyFileData = res.json();
        let utcKeyObject = keyFileData.ETH.utcFile;

        let tovalue = this.sendCryptoFormModel.Value;
        let toaddress = this.sendCryptoFormModel.ToAddress;

        if (this.selectedToken == "ETH")
          this.MTransfer(utcKeyObject, environment.transferPassword, tovalue, toaddress, 21000, 0);
        else
          this.MBNBTransfer(utcKeyObject, environment.transferPassword, tovalue, toaddress, 90000);
    },
    error => {

    });
}



// ether token transfer

async MTransfer(utc, password, amount, to, gas, balance) {
  try {
    var web3 = new Web3(new Web3.providers.HttpProvider(environment.transferWeb3ApiUrl));
    const privateKey = web3.eth.accounts.decrypt(utc, password).privateKey;
    const addressObject = web3.eth.accounts.privateKeyToAccount(privateKey);
    const from = addressObject.address;
    //web3.eth.getTransactionCount(from)
    //.then((count) => {
    let txn = {
      from: from,
      to: to,
      gas: gas,
      value: web3.utils.toWei(amount, 'ether')
      // nonce: count
    }
    await web3.eth.accounts.signTransaction(txn, privateKey)
      .then(async signed => {
        await web3.eth.sendSignedTransaction(signed.rawTransaction)
          .on('transactionHash', (hash) => {
            localStorage.setItem("transferStatusMsg", hash);
            document.getElementById("handleSuccess").click();
            return hash;
          })
      })

    //})

  }
  catch (e) {
    localStorage.setItem("transferStatusMsg", e);
    document.getElementById("handleError").click();
  }
}



// ERC20 Tokens transfer

async MBNBTransfer(utc, password, amount, to, gas) {
  try {
    let contractAddress = this.contractAddress;
    let ABI;
    switch (contractAddress) {
      case "0xB8c77482e45F1F44dE1745F52C74426C631bDD52":
        ABI = environment.bnbTokenAbi;
        break;
      case "0xd850942ef8811f2a866692a623011bde52a462c1":
        ABI = environment.venTokenAbi;
        break;
      case "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2":
        ABI = environment.mkrTokenAbi;
        break;
      case "0xe41d2489571d322189246dafa5ebde1f4699f498":
        ABI = environment.zxrTokenAbi;
        break;
      case "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07":
        ABI = environment.omgTokenAbi;
        break;
      default:
        ABI = environment.fixedTokenABI;
        break;
    }

    const contractInstance = new web3.eth.Contract(ABI, contractAddress);
    contractInstance.setProvider(new Web3.providers.HttpProvider(environment.transferWeb3ApiUrl));

    const privateKey = web3.eth.accounts.decrypt(utc, password).privateKey;
    const addressObject = web3.eth.accounts.privateKeyToAccount(privateKey);
    const from = addressObject.address;

    let Weiamount = web3.utils.toWei(amount);
    let encodedABI = contractInstance.methods.transfer(to, Weiamount).encodeABI();
    // web3.eth.getTransactionCount(from, 'pending')
    //  .then((count) => {
    let txn = {
      from: from,
      to: contractAddress,
      gas: gas,
      data: encodedABI
      // nonce: count
    }
    await web3.eth.accounts.signTransaction(txn, privateKey)
      .then(async (signed) => {
        let transaction = await web3.eth.sendSignedTransaction(signed.rawTransaction)
          .on('transactionHash', (hash) => {
            localStorage.setItem("transferStatusMsg", hash);
            document.getElementById("handleSuccess").click();
            return hash;
          })
      })
    //   })
  }
  catch (e) {
    localStorage.setItem("transferStatusMsg", e);
    document.getElementById("handleError").click();
  }
}



 handleTransferError() {
    this.isLoading = false;
    this.errorMsg = localStorage.getItem("transferStatusMsg");
    $("#errorModal").modal('show');
    setTimeout(() => {
      localStorage.removeItem("transferStatusMsg");
      localStorage.removeItem('key');
    }, 1000);
  }


  handleSuccessMessage() {
    this.isLoading = false;
    this.transferForm.reset({
      toAddress:'',
      amount:'',
      token:'ETH'
    });
    this.successMsg = localStorage.getItem("transferStatusMsg");
    $("#successModal").modal('show');
    setTimeout(() => {
      localStorage.removeItem("transferStatusMsg");
      localStorage.removeItem('key');
    }, 1000);
  }

  successModalHide() {
    $("#successModal").modal('hide');
  }

  errorModalHide() {
    $("#errorModal").modal('hide');
  }




  getUserTokens() {
    let userId = localStorage.getItem('id');
    this.getUserTokensService.getUserTokens(userId).subscribe(
      res => {
          let data:any = res;
          this.userTokensList = data.data;
          this.userTokensList = JSON.parse(this.userTokensList);
      },
      (error:AppError) => {

      }
    )
  }

  ngOnInit() {
    this.getUserTokens();

  }
}
