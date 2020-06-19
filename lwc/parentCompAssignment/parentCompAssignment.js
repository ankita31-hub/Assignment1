import { LightningElement,api,track } from 'lwc';
//import Apex class searchRecord.search
import getAccountList from '@salesforce/apex/searchRecord.search';

export default class ParentCompAssignment extends LightningElement 
{
    @track searchKey;
    @track searchLimit;
    @track filterData;
    @track accounts;
    @track copyResults;
    @track showFilterData = false;

    handleChangeEvent(event){
        
            if (event.target.label === 'Name') {
                this.searchKey = event.target.value;
            }
            else if (event.target.label === 'Record #') {
                this.searchLimit = event.target.value;
            }
            else if (event.target.label === 'filterData') {
                this.filterData = event.target.value;
            }
 
    }
// get the account record by searchName() function using (LimitRec,searchName)
    searchName(){
        console.log('entered name ==>>>'+this.searchKey);
        console.log('entered limit==>>>'+this.searchLimit);
        this.showFilterData = false;
        getAccountList({LimitRec : this.searchLimit,searchName : this.searchKey})
      .then(result => {
          this.accounts = result;
          this.copyResults = result;
          console.log('result===>>>'+result);
          var abc = JSON.stringify(this.accounts);
          console.log('abc===>>'+abc);
      })
      .catch(error => {
          this.error = error;
      });
    }
    filterData12(){
        console.log('filterData==>>'+this.filterData);
        this.showFilterData = true;
        this.copyResults = this.accounts.filter(filterRec => filterRec.Name.toLowerCase().includes(this.filterData.toLowerCase()));

        console.log('copyResults===>>>'+this.copyResults);
          var abc1 = JSON.stringify(this.copyResults);
          console.log('abc===>>'+abc1);
    }
}