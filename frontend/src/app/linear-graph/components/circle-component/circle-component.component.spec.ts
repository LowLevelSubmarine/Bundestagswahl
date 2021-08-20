import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleComponentComponent } from './circle-component.component';

describe('CircleComponentComponent', () => {
  let component: CircleComponentComponent;
  let fixture: ComponentFixture<CircleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
