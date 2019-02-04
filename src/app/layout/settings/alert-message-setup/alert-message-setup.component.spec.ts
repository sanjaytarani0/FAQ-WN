import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessageSetupComponent } from './alert-message-setup.component';

describe('AlertMessageSetupComponent', () => {
  let component: AlertMessageSetupComponent;
  let fixture: ComponentFixture<AlertMessageSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertMessageSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
