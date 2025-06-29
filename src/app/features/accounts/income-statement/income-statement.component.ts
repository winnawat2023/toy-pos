import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.css']
})
export class IncomeStatementComponent implements OnInit {

  constructor(  
    private fb: FormBuilder,
    private datepipe: DatePipe) { }

  fillterForm: FormGroup;
  dailyAccountsForm: FormGroup;

  ngOnInit(): void {
    this.fillterForm = this.fb.group({
      date: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')]
    });

    this.dailyAccountsForm = this.fb.group({
      sales:[],
      transfer:[]
    });
  }

  onSave(){
    console.log('onSave');
  }

}
