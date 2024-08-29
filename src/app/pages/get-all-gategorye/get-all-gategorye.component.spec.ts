import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllGategoryeComponent } from './get-all-gategorye.component';

describe('GetAllGategoryeComponent', () => {
  let component: GetAllGategoryeComponent;
  let fixture: ComponentFixture<GetAllGategoryeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllGategoryeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllGategoryeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
