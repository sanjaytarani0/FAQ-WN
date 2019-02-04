import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppError } from './../../../common/errors/app-error';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  headers;
  transactionListDetails;
  email;
  isLoading: boolean;
  contractAddr;
  ethAddress;
  tokensTransactionList;
  selectedTokenDetail;
  transactionStatus;
  checkEthAddress;

  constructor(private http: Http) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Headers', 'Authorization');
  }


  // get Ether transaction list

  getTransactionList(eth) {
   
    this.tokensTransactionList = null;
    this.isLoading = true;
    this.http.get(environment.getTransactionListUrl + eth + '&startblock=0&endblock=99999999&sort=desc&apikey=MJHJV1M4S7HGTVAU6TMXU742MEWCWBGQZU', this.headers).subscribe(res => {
      this.transactionListDetails = res.json();
      this.transactionStatus = this.transactionListDetails.status;
      this.transactionListDetails = this.transactionListDetails.result;
    
      for (var i = 0; i < this.transactionListDetails.length; i++) {
        this.transactionListDetails[i].value = this.transactionListDetails[i].value * Math.pow(10, -18);
      }
      
      this.isLoading = false; 
    },
    (error:AppError) => {
        console.log(error);
    });
  }


   // get Other tokens transaction list

  getTokensTransactionsList(addr) {
    this.transactionListDetails = null;
    this.isLoading = true;
    this.http.get(environment.getTokensTransactionUrl + addr + '&address=' + this.ethAddress + '&page=1&offset=100&sort=desc', this.headers).subscribe(res => {
      let data = res.json();
      this.tokensTransactionList = data.result;
      for (var i = 0; i < this.tokensTransactionList.length; i++) {
        this.tokensTransactionList[i].value = this.tokensTransactionList[i].value * Math.pow(10, -18);
      }
      this.isLoading = false;
    });
  }



  ngOnInit() {
    this.checkEthAddress = setInterval(() => {
       this.ethAddress = localStorage.getItem('eth');
      if (this.ethAddress != null) {
        clearInterval(this.checkEthAddress)
        this.ethAddress = this.ethAddress.toLowerCase();
        this.getTransactionList(this.ethAddress);
      }
    }, 1000);
  }

}
