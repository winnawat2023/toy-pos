import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { Expenses } from 'src/app/model/expenses';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses?: Expenses[];

  constructor(
    private router: Router,
    private accountService: AccountsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.retrieveExpenses();
  }

  refreshList(): void {
    this.retrieveExpenses();
  }

  retrieveExpenses(): void {
    this.accountService.getAllExpenses().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('expenses', data);
      this.expenses = data;
    });
  }

  editExpense(expnese: Expenses) {
    this.accountService.currentExpense=expnese;
    this.router.navigate(['/accounts/expenses-edit']);
  }

  deleteExpense(expnese: Expenses) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'ต้องการลบข้อมูลค่าใช้จ่าย ' + expnese.name + ' ใช่หรือไม่ ?',
        buttonText: {
          ok: 'ย้นยัน',
          cancel: 'ยกเลิก'
        }
      }
    });
    const snack = this.snackBar.open('confirm delete expense');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        this.snackBar.open('delete ', expnese.name, {
          duration: 2000,
        });
        this.accountService.deleteExpense(expnese.key).then(() => this.retrieveExpenses())
          .catch(err => console.log(err));
      } else {
        snack.dismiss();
      }
    });
  }

}
