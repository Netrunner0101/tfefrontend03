import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteridComponent } from './transporterid.component';

describe('TransporteridComponent', () => {
  let component: TransporteridComponent;
  let fixture: ComponentFixture<TransporteridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporteridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporteridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
