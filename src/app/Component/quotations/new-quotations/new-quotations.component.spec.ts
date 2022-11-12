import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuotationsComponent } from './new-quotations.component';

describe('NewQuotationsComponent', () => {
  let component: NewQuotationsComponent;
  let fixture: ComponentFixture<NewQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuotationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
