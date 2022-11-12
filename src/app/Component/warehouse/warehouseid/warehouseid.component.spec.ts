import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseidComponent } from './warehouseid.component';

describe('WarehouseidComponent', () => {
  let component: WarehouseidComponent;
  let fixture: ComponentFixture<WarehouseidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
