import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBubbleComponent } from './info-bubble.component';

describe('InfoBubbleComponent', () => {
  let component: InfoBubbleComponent;
  let fixture: ComponentFixture<InfoBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
