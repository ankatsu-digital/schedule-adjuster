import { Event } from '../types';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link to={`/event/${event.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{event.title}</h3>
        
        {event.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {event.location && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">📍</span>
              <span>{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <span className="font-semibold">📅</span>
            <div className="flex flex-wrap gap-1">
              {event.dates.slice(0, 3).map((date, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs">
                  {formatDate(date)}
                </span>
              ))}
              {event.dates.length > 3 && (
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  +{event.dates.length - 3}件
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            作成日時: {new Date(event.createdAt).toLocaleDateString('ja-JP')}
          </p>
        </div>
      </div>
    </Link>
  );
};
