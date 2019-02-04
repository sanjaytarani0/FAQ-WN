import { Component, OnInit } from '@angular/core';
import { GetUserTokensService } from 'src/app/services/get-user-tokens.service';
import { AppError } from 'src/app/common/errors/app-error';
import { environment } from './../../../environments/environment';
import { Http } from '@angular/http';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  userTokensList:any;
  checkEthAddress;
  ethAddress;
  ethBalance;
  ethUSD;

  constructor(private http:Http,private getUserTokensService:GetUserTokensService) { 

  }

  ERCtokenList = [];

  getERC20TokenBalance(contractaddress,ethAddress,symbol) {
        var balance = 0;
        var usdBalance = 0;
    this.http.get(environment.getERC20TokenBalanceUrl + contractaddress + "&address=" + ethAddress + "&tag=latest&apikey=d384d15edf92421f863f8331d43c0c8e").subscribe(
      res => {
        let data = res.json();
        balance = data.result * Math.pow(10, -18);

        this.http.get('https://min-api.cryptocompare.com/data/price?fsym=' + symbol + '&tsyms=USD').subscribe(
        res => {
          let one_eth = res.json(); 
          usdBalance = balance * one_eth.USD;
        });
      },
      error => {

      });
      let model = {
        symbol: symbol,
        balance: balance,
        dollarValue : usdBalance
      }
      this.ERCtokenList.push(model);
      console.log(this.ERCtokenList);
  }


  getUserTokens() {
    let userId = localStorage.getItem('id');
    this.getUserTokensService.getUserTokens(userId).subscribe(
      res => {
          let data:any = res;
          this.userTokensList = data.data;
          this.userTokensList = JSON.parse(this.userTokensList);
          // console.log(this.userTokensList);
          for(let i=0;i<this.userTokensList.length;i++) {
              switch(this.userTokensList[i].symbol)
              {
                case 'BNB': 
                    this.getERC20TokenBalance(this.userTokensList[i].contractAdd,this.ethAddress,this.userTokensList[i].symbol);
                    break;
                    case 'ZRX': 
                    this.getERC20TokenBalance(this.userTokensList[i].contractAdd,this.ethAddress,this.userTokensList[i].symbol);
                    break;
                    case 'MKR': 
                    this.getERC20TokenBalance(this.userTokensList[i].contractAdd,this.ethAddress,this.userTokensList[i].symbol);
                    break;
                    case 'VEN': 
                    this.getERC20TokenBalance(this.userTokensList[i].contractAdd,this.ethAddress,this.userTokensList[i].symbol);
                    break;
                    case 'OMG': 
                    this.getERC20TokenBalance(this.userTokensList[i].contractAdd,this.ethAddress,this.userTokensList[i].symbol);
                    break;
                    default:
                    break;
              }
          }
      },
      (error:AppError) => {

      }
    )
  }

  getEtherBalance(eth) {
      this.http.get(environment.getEtherBalanceUrl + eth + "&tag=latest").subscribe(
        res => {
          let ethBalanceData = res.json();
          this.ethBalance = ethBalanceData.result * Math.pow(10, -18);
          this.getUSDforEther(this.ethBalance);
          this.getUserTokens();

        },
        error => {

        }
      )
  }

  getUSDforEther(ethBalance) {
    this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').subscribe(
      res => {
        let one_eth = res.json(); 
        this.ethUSD = ethBalance * one_eth.USD;
      }
    );
  }

  

  ngOnInit() {
    this.checkEthAddress = setInterval(() => {
      this.ethAddress = localStorage.getItem('eth');
     if (this.ethAddress != null) {
       clearInterval(this.checkEthAddress)
       this.ethAddress = this.ethAddress.toLowerCase();
       this.getEtherBalance(this.ethAddress);
     }
   }, 1000);

  }

}
