import { TestBed } from '@angular/core/testing';

import { MainGuradsGuard } from './main-gurads.guard';

describe('MainGuradsGuard', () => {
  let guard: MainGuradsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainGuradsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
