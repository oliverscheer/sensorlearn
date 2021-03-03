import { Component, Input, OnInit, SimpleChanges,  } from '@angular/core';
import { SensorValues } from 'src/app/models/sensorvalues ';

@Component({
  selector: 'app-sensorvaluescanvas',
  templateUrl: './sensorvaluescanvas.component.html',
  styleUrls: ['./sensorvaluescanvas.component.scss']
})
export class SensorvaluescanvasComponent implements OnInit {
  // @ViewChild('canvas') public canvas: ElementRef | undefined;

  canvas: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;

  canvasWidth = 0;
  canvasHeight = 0;

  @Input() sensorValues: SensorValues | undefined;
  @Input() sensorValuesArray: SensorValues[] | undefined;
  constructor() { 
  }

  ngOnInit(): void {
    
    console.log("ngOnInit");

    this.setupCanvas();
    this.drawData();
  } 

  ngOnChanges(changes: SimpleChanges) : void {

    if (changes.sensorValues && changes.sensorValues.currentValue) {
      let v = changes.sensorValues.currentValue;
      this.drawSensorValue(v);
    }
  }

  drawData() : void {
    
    var context = this.getContext();

    if (context) {
    
      if (this.sensorValuesArray)
      {
        this.sensorValuesArray.forEach(sensorValue => {
          
          this.drawSensorValue(sensorValue);
        });
      }
      context?.stroke();

      // var canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    }
  }

  virtualSizeX = 4000;
  virtualSizeY = 4000;

  drawSensorValue(v: SensorValues): void {

    console.log("drawSensorValue");
    console.log(v);

    if (!this.canvas) return;

    var context = this.canvas.getContext("2d");

    if (context) {

      // Calculate center
      var transXFactor = (this.canvasWidth / this.virtualSizeX);
      var transYFactor = (this.canvasHeight / this.virtualSizeY);

      var calcX = (this.canvasWidth/2) + v.accelerationX * transXFactor;
      var calcY = (this.canvasHeight/2) + v.accelerationY * transYFactor;

      context.beginPath();
      context.strokeRect(calcX, calcY, 10, 10);
    }
  }

  getContext() : CanvasRenderingContext2D | null {
    this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    var context = this.canvas.getContext("2d");
    
    return context;
  }

  clearCanvas(): void {
    var context = this.getContext();
    if (!context) return; 
    context.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    this.setupCanvas();
  }

  setupCanvas(): void {
    var context = this.getContext();
    if (!context) return; 

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'red';
    context.lineWidth = 1;

    context.moveTo(this.canvasWidth/2, 0);
    context.lineTo(this.canvasWidth/2, this.canvasHeight);
    context.moveTo(0, this.canvasHeight/2);
    context.lineTo(this.canvasWidth, this.canvasHeight/2);
    context.stroke();

    context.strokeStyle = 'black';
  }

}
