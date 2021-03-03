import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LiveviewComponent } from './pages/liveview/liveview.component';
import { RecordedviewComponent } from './pages/recordedview/recordedview.component';
import { ClockComponent } from './controls/clock/clock.component';
import { NavigationComponent } from './controls/navigation/navigation.component';
import { FooterComponent } from './controls/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { SensorvaluesComponent } from './controls/sensorvalues/sensorvalues.component';
import { DataService } from './services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SensorvaluestableComponent } from './controls/sensorvaluestable/sensorvaluestable.component';
import { SensorvaluesfilterComponent } from './controls/sensorvaluesfilter/sensorvaluesfilter.component';
import { SensorvaluescanvasComponent } from './controls/sensorvaluescanvas/sensorvaluescanvas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LiveviewComponent,
    RecordedviewComponent,
    ClockComponent,
    NavigationComponent,
    FooterComponent,
    AboutComponent,
    SensorvaluesComponent,
    SensorvaluestableComponent,
    SensorvaluesfilterComponent,
    SensorvaluescanvasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
