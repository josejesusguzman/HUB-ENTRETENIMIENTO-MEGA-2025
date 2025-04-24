import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmHideModalComponent } from './confirm-hide-modal.component';

describe('ConfirmHideModalComponent', () => {
  let component: ConfirmHideModalComponent;
  let fixture: ComponentFixture<ConfirmHideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmHideModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmHideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
