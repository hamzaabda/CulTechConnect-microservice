// reclamation.model.ts

export enum EventType {
    Event,
    Partnership
  }
  
  export class Reclamation {
    id: number;
    name: string;
    email: string;
    message: string;
    eventtype: EventType;
  }
  