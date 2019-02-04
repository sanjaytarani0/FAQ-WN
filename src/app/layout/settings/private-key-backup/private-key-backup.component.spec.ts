import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateKeyBackupComponent } from './private-key-backup.component';

describe('PrivateKeyBackupComponent', () => {
  let component: PrivateKeyBackupComponent;
  let fixture: ComponentFixture<PrivateKeyBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateKeyBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateKeyBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
