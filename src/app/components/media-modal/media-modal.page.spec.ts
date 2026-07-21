import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaModalPage } from './media-modal.page';

describe('MediaModalPage', () => {
  let component: MediaModalPage;
  let fixture: ComponentFixture<MediaModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
