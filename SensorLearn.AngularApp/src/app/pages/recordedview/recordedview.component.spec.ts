import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedviewComponent } from './recordedview.component';

describe('RecordedviewComponent', () => {
  let component: RecordedviewComponent;
  let fixture: ComponentFixture<RecordedviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordedviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
