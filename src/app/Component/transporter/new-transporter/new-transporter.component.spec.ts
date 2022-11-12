import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTransporterComponent } from './new-transporter.component';

describe('NewTransporterComponent', () => {
  let component: NewTransporterComponent;
  let fixture: ComponentFixture<NewTransporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTransporterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
