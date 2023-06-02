import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceOfferCreationComponent } from './workplace-offer-creation.component';

describe('WorkplaceOfferCreationComponent', () => {
  let component: WorkplaceOfferCreationComponent;
  let fixture: ComponentFixture<WorkplaceOfferCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkplaceOfferCreationComponent]
    });
    fixture = TestBed.createComponent(WorkplaceOfferCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
