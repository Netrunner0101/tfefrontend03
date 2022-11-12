import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryIdComponent } from './delivery.id.component';

describe('DeliveryIdComponent', () => {
  let component: DeliveryIdComponent;
  let fixture: ComponentFixture<DeliveryIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
