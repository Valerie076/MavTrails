import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeafletTestPage } from './leaflet-test.page';

describe('LeafletTestPage', () => {
  let component: LeafletTestPage;
  let fixture: ComponentFixture<LeafletTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafletTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
