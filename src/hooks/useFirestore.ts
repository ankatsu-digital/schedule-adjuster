import { useState, useCallback } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { Event, Participant } from '../types';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create Event
  const createEvent = useCallback(async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Event by ID
  const getEvent = useCallback(async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'events'), where('id', '==', eventId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Event;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get Participants for Event
  const getParticipants = useCallback(async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'participants'), where('eventId', '==', eventId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Participant));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch participants');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add Participant Response
  const addParticipant = useCallback(async (participantData: Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, 'participants'), {
        ...participantData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add participant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update Participant Response
  const updateParticipant = useCallback(async (participantId: string, responses: Record<string, boolean>) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'participants', participantId);
      await updateDoc(docRef, {
        responses,
        updatedAt: Timestamp.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update participant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete Event
  const deleteEvent = useCallback(async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'events', eventId);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createEvent,
    getEvent,
    getParticipants,
    addParticipant,
    updateParticipant,
    deleteEvent,
  };
};
