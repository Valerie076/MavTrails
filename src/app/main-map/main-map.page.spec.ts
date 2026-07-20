import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMapPage } from './main-map.page';

describe('MainMapPage', () => {
  let component: MainMapPage;
  let fixture: ComponentFixture<MainMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
