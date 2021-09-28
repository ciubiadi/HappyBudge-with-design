import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WalletModel } from 'app/models/wallet.model';
import { WalletsService } from 'app/services/wallets.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {

  walletWord !: any;
  
  formValue !: FormGroup;
  walletModelObj : WalletModel = new WalletModel();
  walletsData !: any;
  // walletsData: WalletModel[] = [];
  showAdd!: boolean;

  constructor(
    private walletsService: WalletsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllWallets();
    this.formValue =  this.formBuilder.group({
      walletName : [''],
      ownerName : [''],
      walletDescription : [''] 
    })
  }

  getAllWallets() {
    this.walletsService.getWallets().subscribe(res => {
      this.walletsData = res;
    })
  }

  clickAddWallet() {
    this.formValue.reset();
    this.showAdd = true;
    // this.walletsService.setShowAdd(true);
    // this.showAdd = this.walletsService.getShowAdd();
  }

   postWalletDetails() {
    this.walletModelObj.name = this.formValue.value.walletName;
    // this.walletsData[0].name = this.formValue.value.walletName;
    this.walletModelObj.owner = this.formValue.value.ownerName;
    // this.walletsData[0].owner = this.formValue.value.ownerName;
    this.walletModelObj.description = this.formValue.value.walletDescription;
    // this.walletsData[0].description = this.formValue.value.walletDescription;

    this.walletsService.postWallet(this.walletModelObj)
    .subscribe(res => {
      console.log(this.walletModelObj);
      alert("Wallet Added Succesfully");
      let ref = document.getElementById('cancel');
      ref?.click() ;
      this.formValue.reset();
      this.walletsData.push(res);
    },
    err => {
      alert("Something went wrong");
    })
  }

  deleteWallet(wallet: any) {
    this.walletsService.deleteWallet(wallet.id).subscribe(res => {
      alert('Wallet Deleted Succesfully');
      this.getAllWallets();
    });
  }

  onEdit(wallet: any) {
    this.showAdd = false;
    // this.walletsService.setShowAdd(false);
    // this.showAdd = this.walletsService.getShowAdd();

    this.walletModelObj.id = wallet.id;
    this.formValue.controls['walletName'].setValue(wallet.name);
    this.formValue.controls['ownerName'].setValue(wallet.owner);
    this.formValue.controls['walletDescription'].setValue(wallet.description);
  }

  updateWalletDetails(){
    this.walletModelObj.name = this.formValue.value.walletName;
    this.walletModelObj.owner = this.formValue.value.ownerName;
    this.walletModelObj.description = this.formValue.value.walletDescription;
 
    this.walletsService.updateWallet(this.walletModelObj, this.walletModelObj.id)
    .subscribe(res => {
      alert("Updated Succesfully");
      let ref = document.getElementById('cancel');
      ref?.click() ;
      this.formValue.reset(); 
      this.getAllWallets();
    });
  }
}
