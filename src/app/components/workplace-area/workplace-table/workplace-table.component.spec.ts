import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceTableComponent } from './workplace-table.component';

describe('WorkplaceTableComponent', () => {
  let component: WorkplaceTableComponent;
  let fixture: ComponentFixture<WorkplaceTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkplaceTableComponent],
    });
    fixture = TestBed.createComponent(WorkplaceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
