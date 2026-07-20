import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewpagePage } from './newpage.page';

describe('NewpagePage', () => {
  let component: NewpagePage;
  let fixture: ComponentFixture<NewpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
