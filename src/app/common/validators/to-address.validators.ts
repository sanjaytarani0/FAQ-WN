import { AbstractControl, ValidationErrors } from "@angular/forms";

export class toAddressValidators {

 static checkValidAddress(control:AbstractControl) : ValidationErrors | null {
     let eth_Regex = '^0x[a-fA-F0-9]{40}$';
     let email_Regex = '^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$';
       
     if(control.value.match(eth_Regex) || control.value.match(email_Regex)) {
         return null;
     }
     else {
         return  {checkValidAddress : true} ;
     }
 }



}