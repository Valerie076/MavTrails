import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrailModalPage } from './trail-modal.page';

describe('TrailModalPage', () => {
  let component: TrailModalPage;
  let fixture: ComponentFixture<TrailModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
