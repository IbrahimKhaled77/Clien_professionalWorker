import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAllComponent } from './service-all.component';

describe('ServiceAllComponent', () => {
  let component: ServiceAllComponent;
  let fixture: ComponentFixture<ServiceAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAllComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServiceAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
