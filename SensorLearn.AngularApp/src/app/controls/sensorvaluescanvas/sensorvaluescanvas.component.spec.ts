import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorvaluescanvasComponent } from './sensorvaluescanvas.component';

describe('SensorvaluescanvasComponent', () => {
  let component: SensorvaluescanvasComponent;
  let fixture: ComponentFixture<SensorvaluescanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorvaluescanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorvaluescanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
