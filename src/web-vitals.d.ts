import { Metric } from 'web-vitals'; // Import the Metric type

declare module 'web-vitals' {
  export function onCLS(onPerfEntry: (metric: Metric) => void): void;
  export function onFCP(onPerfEntry: (metric: Metric) => void): void;
  export function onFID(onPerfEntry: (metric: Metric) => void);
  export function onLCP(onPerfEntry: (metric: Metric) => void);
  export function onTTFB(onPerfEntry: (metric: Metric) => void);
  // Add declarations for other functions if you use them (e.g., onINP)
}