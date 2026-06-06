export interface Event {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  participants: Participant[];
  availableTime: TimeSlot[];
  suggestedTime?: TimeSlot;
  status: 'draft' | 'active' | 'closed';
  createdAt: number;
  expiresAt: number;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  availableSlots: TimeSlot[];
  createdAt: number;
}

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  count?: number; // Number of participants available
}

export interface CreateEventInput {
  title: string;
  description: string;
  createdBy: string;
  availableTime: TimeSlot[];
}

export interface AddParticipantInput {
  eventId: string;
  name: string;
  email: string;
  availableSlots: TimeSlot[];
}
