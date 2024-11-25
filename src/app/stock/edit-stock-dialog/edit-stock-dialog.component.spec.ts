import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockDialogComponent } from './edit-stock-dialog.component';

describe('EditStockDialogComponent', () => {
  let component: EditStockDialogComponent;
  let fixture: ComponentFixture<EditStockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStockDialogComponent]
    });
    fixture = TestBed.createComponent(EditStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
