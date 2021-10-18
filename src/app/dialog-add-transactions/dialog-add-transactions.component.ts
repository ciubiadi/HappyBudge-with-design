import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from 'app/services/transaction.service';

@Component({
  selector: 'app-dialog-add-transactions',
  templateUrl: './dialog-add-transactions.component.html',
  styleUrls: ['./dialog-add-transactions.component.scss']
})
export class DialogAddTransactionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{age:number, name:string},
    private matDialogRef: MatDialogRef<DialogAddTransactionsComponent>,
    public transactionService: TransactionService
    ) { }

    transactionTypesData = [
      { id: 1, value: 'income'},
      { id: 2, value: 'expense'}
    ];

  ngOnInit(): void {
    // alert(this.data);
  }

  ngOnDestroy() {
    this.matDialogRef.close(this.data);
  }

  onClear() {
    this.transactionService.form.reset();
    this.transactionService.initializeFormGroup();
  }

  onCloseClick(){
    this.matDialogRef.close();
  }

}
