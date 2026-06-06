import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { Event, Participant, CreateEventInput, AddParticipantInput, TimeSlot } from './types';

const EVENTS_COLLECTION = 'events';
const PARTICIPANTS_COLLECTION = 'participants';

export const eventService = {
  async createEvent(input: CreateEventInput): Promise<Event> {
    const eventId = doc(collection(db, EVENTS_COLLECTION)).id;
    const now = Date.now();
    
    const event: Event = {
      id: eventId,
      title: input.title,
      description: input.description,
      createdBy: input.createdBy,
      participants: [],
      availableTime: input.availableTime,
      status: 'draft',
      createdAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    await setDoc(doc(db, EVENTS_COLLECTION, eventId), event);
    return event;
  },

  async getEvent(eventId: string): Promise<Event | null> {
    const docSnap = await getDoc(doc(db, EVENTS_COLLECTION, eventId));
    return docSnap.exists() ? (docSnap.data() as Event) : null;
  },

  async updateEvent(eventId: string, updates: Partial<Event>): Promise<void> {
    await updateDoc(doc(db, EVENTS_COLLECTION, eventId), updates);
  },

  async deleteEvent(eventId: string): Promise<void> {
    await deleteDoc(doc(db, EVENTS_COLLECTION, eventId));
  },

  async getUserEvents(userId: string): Promise<Event[]> {
    const q = query(
      collection(db, EVENTS_COLLECTION),
      where('createdBy', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Event);
  },
};

export const participantService = {
  async addParticipant(input: AddParticipantInput): Promise<Participant> {
    const participantId = doc(collection(db, PARTICIPANTS_COLLECTION)).id;
    
    const participant: Participant = {
      id: participantId,
      name: input.name,
      email: input.email,
      availableSlots: input.availableSlots,
      createdAt: Date.now(),
    };

    await setDoc(
      doc(db, EVENTS_COLLECTION, input.eventId, PARTICIPANTS_COLLECTION, participantId),
      participant
    );

    // Update event with new participant
    const event = await eventService.getEvent(input.eventId);
    if (event) {
      await eventService.updateEvent(input.eventId, {
        participants: [...event.participants, participant],
      });
    }

    return participant;
  },

  async getParticipants(eventId: string): Promise<Participant[]> {
    const querySnapshot = await getDocs(
      collection(db, EVENTS_COLLECTION, eventId, PARTICIPANTS_COLLECTION)
    );
    return querySnapshot.docs.map(doc => doc.data() as Participant);
  },

  async updateParticipant(
    eventId: string,
    participantId: string,
    availableSlots: TimeSlot[]
  ): Promise<void> {
    await updateDoc(
      doc(db, EVENTS_COLLECTION, eventId, PARTICIPANTS_COLLECTION, participantId),
      { availableSlots }
    );
  },
};
