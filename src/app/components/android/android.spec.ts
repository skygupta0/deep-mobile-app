import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Android } from './android';

describe('Android', () => {
  let component: Android;
  let fixture: ComponentFixture<Android>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Android]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Android);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
