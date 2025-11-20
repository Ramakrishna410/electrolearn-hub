/**
 * TypeScript interfaces for Device data structure
 * These match the JSON structure in public/data/*.json files
 */

export interface Hotspot {
  slotName: string;
  label: string;
  x: number;
  y: number;
  z: number;
  description: string;
  datasheet?: string;
}

export interface Component {
  name: string;
  function: string;
  datasheet: string;
}

export interface DeviceData {
  name: string;
  model?: string;
  pinoutImage: string;
  components: Component[];
  hotspots?: Hotspot[];
  exampleCode: string;
}
