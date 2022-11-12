import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsIdComponent } from './quotations-id.component';

describe('QuotationsIdComponent', () => {
  let component: QuotationsIdComponent;
  let fixture: ComponentFixture<QuotationsIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationsIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
