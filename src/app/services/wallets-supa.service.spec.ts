import { TestBed } from '@angular/core/testing';

import { WalletsSupaService } from './wallets-supa.service';

describe('WalletsSupaService', () => {
  let service: WalletsSupaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletsSupaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
