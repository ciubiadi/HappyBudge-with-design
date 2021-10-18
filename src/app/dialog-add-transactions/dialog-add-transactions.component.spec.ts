import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTransactionsComponent } from './dialog-add-transactions.component';

describe('DialogAddTransactionsComponent', () => {
  let component: DialogAddTransactionsComponent;
  let fixture: ComponentFixture<DialogAddTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
