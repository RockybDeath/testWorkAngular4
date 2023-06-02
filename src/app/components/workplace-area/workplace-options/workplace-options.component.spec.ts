import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceOptionsComponent } from './workplace-options.component';

describe('WorkplaceOptionsComponent', () => {
  let component: WorkplaceOptionsComponent;
  let fixture: ComponentFixture<WorkplaceOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkplaceOptionsComponent]
    });
    fixture = TestBed.createComponent(WorkplaceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
