import { TestBed } from '@angular/core/testing';

import { WalletsService } from './wallets.service';

describe('WalletService', () => {
  let service: WalletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
