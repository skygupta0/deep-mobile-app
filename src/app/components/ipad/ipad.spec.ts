import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipad } from './ipad';

describe('Ipad', () => {
  let component: Ipad;
  let fixture: ComponentFixture<Ipad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ipad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
