import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointGraphComponent } from './point-graph.component';

describe('PointGraphComponent', () => {
  let component: PointGraphComponent;
  let fixture: ComponentFixture<PointGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
