import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParliamentCompositionComponent } from './parliament-composition.component';

describe('ParliamentCompositionComponent', () => {
  let component: ParliamentCompositionComponent;
  let fixture: ComponentFixture<ParliamentCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParliamentCompositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParliamentCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
