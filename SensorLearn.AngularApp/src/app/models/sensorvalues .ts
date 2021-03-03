export interface SensorValues {
  latitude: number;
  longitude: number;
  altitude: number;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;
  heartRate: number;
  cadence: number;
  magnitudeX: number;
  magnitudeY: number;
  magnitudeZ: number;
  power: number;
  heading: number;
  speed: number;
  temperature: number;
  pressure: number;
  id: string;
  userID: string;
  eventProcessedUtcTime: Date;
  eventEnqueuedUtcTime: Date;
  deviceDateTime: string;
}
