import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { DailyAccount } from 'src/app/model/accounts';

@Component({
  selector: 'app-inout-weekly',
  templateUrl: './inout-weekly.component.html',
  styleUrls: ['./inout-weekly.component.css']
})
export class InoutWeeklyComponent implements OnInit {

  fillterForm: FormGroup;
  dailyAccount: DailyAccount[];
 
  income_cash =0;
  income_transfer=0;
  income_total =0;

  total_outcome_cash=0;
  total_outcome_transfer =0;
  total_outcome_bag=0;
  total_outcome_credit =0;
  total_outcome=0;
  total_wallet=0
  total_shortOver=0;

 
  paymentType

  constructor(
    private accountService: AccountsService,
    private fb: FormBuilder,
    private datepipe: DatePipe) { }
     

  ngOnInit(): void {
    this.paymentType = this.accountService.paymentTypes;
    this.createForm()
  }

  createForm(){
    this.fillterForm = this.fb.group({
      startDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
      endDate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')]
    });
  }

  onSearch(){
    this.income_cash =0;
    this.income_transfer=0;
    this.income_total =0;
  
    this.total_outcome_cash=0;
    this.total_outcome_transfer =0;
    this.total_outcome_bag=0;
    this.total_outcome_credit =0;
    this.total_outcome=0;
    this.total_wallet=0;
    this.total_shortOver=0;
    this.retrieveAccountDaily();
  }

  retrieveAccountDaily(): void {
    this.dailyAccount = [];
    console.log('retrieveAccountDaily', this.fillterForm.value);
    let startDate = this.fillterForm.get('startDate').value;
    let endDate = this.fillterForm.get('endDate').value;
    this.accountService.getReportDailyAccount(startDate, endDate).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('dailyAccount', data);
      if (data.length > 0) {
        this.dailyAccount=data;
        for(let d of this.dailyAccount){
         
          this.income_cash = this.income_cash+d.income_cash;
          this.income_transfer= this.income_transfer+d.income_transfer;
          this.income_total =this.income_total+d.income_total;
        
          this.total_outcome_cash = this.total_outcome_cash+d.total_outcome_cash;
          this.total_outcome_transfer = this.total_outcome_transfer+d.total_outcome_transfer;
          this.total_outcome_bag=this.total_outcome_bag+d.total_outcome_bag;
          this.total_outcome_credit = this.total_outcome_credit+d.total_outcome_credit;
          this.total_outcome=this.total_outcome+d.total_outcome;
          this.total_wallet=d.wallet + this.total_wallet;
          for(let ex of d.outcomes){
            if(ex.payment_type.payment_id=='2'){
              this.total_wallet=this.total_wallet-ex.outcome_total;
            }
          }
          this.total_shortOver=this.total_shortOver+(((d.income_cash+(d.income_transfer-d.total_outcome_food))-d.sale_total));
        }
      }
    });
    
  }
  

}
