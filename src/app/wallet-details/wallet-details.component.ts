import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransactionModel } from 'app/models/transaction.model';
import { WalletModel } from 'app/models/wallet.model';
import { TransactionService } from 'app/services/transaction.service';
import { WalletsService } from 'app/services/wallets.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
// import { DialogAddTransactionsComponent } from 'app/dialog-add-transactions/dialog-add-transactions.component';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss']
})
export class WalletDetailsComponent implements OnInit {
  
  walletData !: any;
  walletModelObj : WalletModel = new WalletModel();
  transactionsData !: any;
  transactionModelObj : TransactionModel = new TransactionModel();
  // transactionModelObj : TransactionModel | undefined;

  formTransaction !: FormGroup;
  options!: FormGroup;
  colorControl = new FormControl('primary');

  expenses : any;
  incomes : any;

  displayedColumns = ['id','title', 'description','type','amount','date','actions'];

  dataSource: MatTableDataSource<TransactionModel>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private walletsService: WalletsService,
    private transactionsService: TransactionService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<WalletDetailsComponent>
  ) {
    this.options = formBuilder.group({
      color: this.colorControl
    });
    this.getWalletTransactions();
   }

  ngOnInit(): void {
    this.getWallet();
    this.getWalletExpenses();
    this.getWalletIncomes();
    this.formTransaction =  this.formBuilder.group({
      transactionTitle : [''],
      transactionDescription : [''],
      transactionAmount : [''],
      transactionType : ['']
    });
  }

  onSubmit() {
    if(this.transactionsService.form.valid) {
      this.transactionsService.postTransaction(this.transactionsService.form.value);
      this.transactionsService.form.reset();
      this.transactionsService.initializeFormGroup();
      this.showNotification('::Submitted succesfully', 'success');
      this.onClose();
    }
  }

  onClose() {
    this.transactionsService.form.reset();
    this.transactionsService.initializeFormGroup();
    this.dialogRef.close();
  }

  clickAddTransaction2(): void {
    this.transactionsService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px"; 

    // this.dialog.open(DialogAddTransactionsComponent, dialogConfig);

    // let dialogRef = this.dialog.open(DialogAddTransactionsComponent,
    //   {
    //     data: {
    //       age: 100,
    //       name: 'king'
    //     },
    //     width:"500px",
    //     height:"500px"
    //   });
      // dialogRef.afterClosed().subscribe(
        // result => {
          // alert(result.name);
        // }
      // );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getWallet(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('walletId')!, 10);
    this.walletsService.getWallet(id)
      .subscribe(res => this.walletData = res);
  }

  getWalletTransactions(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('walletId')!, 10);
    this.walletsService.getWalletTransactions(id)
    .subscribe(res => {
      this.transactionsData = res; 
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getWalletExpenses(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('walletId')!, 10);
    this.walletsService.getWalletTransactionsType(id, 'expense')
    .subscribe(res => this.expenses = res);
  }

  getWalletIncomes(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('walletId')!, 10);
    this.walletsService.getWalletTransactionsType(id, 'income')
    .subscribe(res => this.incomes = res);
  }

  postTransaction() {
    const id = parseInt(this.route.snapshot.paramMap.get('walletId')!, 10);
    let date = new Date('dd/mm/yyyy');
    let finalDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(); 
    console.log(finalDate);
    this.transactionModelObj.title = this.formTransaction.value.transactionTitle;
    // this.walletsData[0].name = this.formValue.value.walletName;
    this.transactionModelObj.description = this.formTransaction.value.transactionDescription;
    // this.walletsData[0].owner = this.formValue.value.ownerName;
    this.transactionModelObj.amount = this.formTransaction.value.transactionAmount;
    this.transactionModelObj.type = this.formTransaction.value.transactionType;
    this.transactionModelObj.walletId = id;
    this.transactionModelObj.date = new Date();
    this.transactionModelObj.currency = this.formTransaction.value.transactionCurrency;


    this.transactionsService.postTransaction(this.transactionModelObj)
    .subscribe(res => {
      console.log(this.transactionModelObj);
      alert("Transaction Added Succesfully");
      this.formTransaction.reset();
      this.transactionsData.push(res);
      this.getWalletTransactions();
    },
    err => {
      alert("Something went wrong");
    })
  }
  
  goBack(): void {
    this.location.back();
  }
}
