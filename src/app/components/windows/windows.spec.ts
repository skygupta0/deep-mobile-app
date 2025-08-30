import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Windows } from './windows';

describe('Windows', () => {
  let component: Windows;
  let fixture: ComponentFixture<Windows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Windows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Windows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
