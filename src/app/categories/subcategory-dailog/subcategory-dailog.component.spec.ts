import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDialogComponent } from './subcategory-dailog.component';

describe('SubcategoryDailogComponent', () => {
  let component: SubcategoryDialogComponent;
  let fixture: ComponentFixture<SubcategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryDialogComponent],
    });
    fixture = TestBed.createComponent(SubcategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
