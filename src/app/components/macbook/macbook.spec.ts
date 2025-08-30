import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Macbook } from './macbook';

describe('Macbook', () => {
  let component: Macbook;
  let fixture: ComponentFixture<Macbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Macbook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Macbook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
