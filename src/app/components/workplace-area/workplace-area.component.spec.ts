import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceAreaComponent } from './workplace-area.component';

describe('WorkplaceAreaComponent', () => {
  let component: WorkplaceAreaComponent;
  let fixture: ComponentFixture<WorkplaceAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkplaceAreaComponent],
    });
    fixture = TestBed.createComponent(WorkplaceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
