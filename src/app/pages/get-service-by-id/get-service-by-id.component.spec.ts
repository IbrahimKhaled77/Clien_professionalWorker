import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetServiceByIdComponent } from './get-service-by-id.component';

describe('GetServiceByIdComponent', () => {
  let component: GetServiceByIdComponent;
  let fixture: ComponentFixture<GetServiceByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetServiceByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetServiceByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
