import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByIdApprovedComponent } from './order-by-id-approved.component';

describe('OrderByIdApprovedComponent', () => {
  let component: OrderByIdApprovedComponent;
  let fixture: ComponentFixture<OrderByIdApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderByIdApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderByIdApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
