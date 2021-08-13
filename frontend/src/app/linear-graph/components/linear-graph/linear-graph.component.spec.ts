import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearGraphComponent } from './linear-graph.component';

describe('LinearGraphComponent', () => {
  let component: LinearGraphComponent;
  let fixture: ComponentFixture<LinearGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
