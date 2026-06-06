import { Event, TimeSlot, Participant } from '../types';

export const suggestionEngine = {
  calculateOptimalTime(event: Event): TimeSlot | null {
    if (event.participants.length === 0) {
      return null;
    }

    const timeSlotScores: { [key: string]: number } = {};

    // Score each available time slot
    for (const slot of event.availableTime) {
      const key = `${slot.date}|${slot.startTime}|${slot.endTime}`;
      timeSlotScores[key] = 0;

      // Count participants available for this slot
      for (const participant of event.participants) {
        if (isParticipantAvailable(participant, slot)) {
          timeSlotScores[key]++;
        }
      }
    }

    // Find slot with highest score
    let bestSlot: TimeSlot | null = null;
    let maxScore = 0;

    for (const slot of event.availableTime) {
      const key = `${slot.date}|${slot.startTime}|${slot.endTime}`;
      if (timeSlotScores[key] > maxScore) {
        maxScore = timeSlotScores[key];
        bestSlot = { ...slot, count: timeSlotScores[key] };
      }
    }

    return bestSlot;
  },

  getParticipationRate(event: Event, slot: TimeSlot): number {
    if (event.participants.length === 0) return 0;
    
    const availableCount = event.participants.filter(p => 
      isParticipantAvailable(p, slot)
    ).length;

    return (availableCount / event.participants.length) * 100;
  },

  getAllSlotScores(event: Event): Array<TimeSlot & { participation: number }> {
    return event.availableTime.map(slot => ({
      ...slot,
      participation: this.getParticipationRate(event, slot),
    })).sort((a, b) => b.participation - a.participation);
  },
};

function isParticipantAvailable(participant: Participant, slot: TimeSlot): boolean {
  return participant.availableSlots.some(
    availSlot =>
      availSlot.date === slot.date &&
      availSlot.startTime === slot.startTime &&
      availSlot.endTime === slot.endTime
  );
}
