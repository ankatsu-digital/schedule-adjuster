export interface Event {
  id: string;
  title: string;
  description: string;
  dates: string[]; // YYYY-MM-DD format
  location: string;
  adminPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  id: string;
  eventId: string;
  name: string;
  email: string;
  responses: Record<string, boolean>; // dateIndex: available
  createdAt: Date;
  updatedAt: Date;
}

export interface EventWithStats extends Event {
  totalParticipants: number;
  responses: Participant[];
}

export interface DateAvailability {
  date: string;
  count: number;
  percentage: number;
}
