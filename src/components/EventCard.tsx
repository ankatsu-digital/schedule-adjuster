import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const participantCount = event.participants.length;
  const timeSlotCount = event.availableTime.length;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{timeSlotCount} 時間帯</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{participantCount} 人</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${
          event.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : event.status === 'draft'
            ? 'bg-gray-100 text-gray-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {event.status === 'active' ? 'アクティブ' : event.status === 'draft' ? 'ドラフト' : '終了'}
        </span>
      </div>
    </div>
  );
};
