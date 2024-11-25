import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockConfirmationDialogComponent } from './stock-confirmation-dialog.component';

describe('StockConfirmationDialogComponent', () => {
  let component: StockConfirmationDialogComponent;
  let fixture: ComponentFixture<StockConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(StockConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
