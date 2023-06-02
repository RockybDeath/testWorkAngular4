import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceActionDialogComponent } from './workplace-action-dialog.component';

describe('WorkplaceActionDialogComponent', () => {
  let component: WorkplaceActionDialogComponent;
  let fixture: ComponentFixture<WorkplaceActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkplaceActionDialogComponent]
    });
    fixture = TestBed.createComponent(WorkplaceActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
