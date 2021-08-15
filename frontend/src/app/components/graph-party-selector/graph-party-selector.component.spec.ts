import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPartySelectorComponent } from './graph-party-selector.component';

describe('GraphPartySelectorComponent', () => {
  let component: GraphPartySelectorComponent;
  let fixture: ComponentFixture<GraphPartySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphPartySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPartySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
