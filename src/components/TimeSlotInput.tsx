import React from 'react';
import { TimeSlot } from '../types';
import { X } from 'lucide-react';

interface TimeSlotInputProps {
  slots: TimeSlot[];
  onChange: (slots: TimeSlot[]) => void;
}

export const TimeSlotInput: React.FC<TimeSlotInputProps> = ({ slots, onChange }) => {
  const addSlot = () => {
    onChange([
      ...slots,
      {
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
      },
    ]);
  };

  const removeSlot = (index: number) => {
    onChange(slots.filter((_, i) => i !== index));
  };

  const updateSlot = (index: number, field: keyof TimeSlot, value: string) => {
    const updated = [...slots];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">利用可能な時間帯</h3>
        <button
          onClick={addSlot}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          + 時間帯を追加
        </button>
      </div>

      <div className="space-y-3">
        {slots.map((slot, index) => (
          <div key={index} className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                日付
              </label>
              <input
                type="date"
                value={slot.date}
                onChange={(e) => updateSlot(index, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                開始時刻
              </label>
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                終了時刻
              </label>
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => removeSlot(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
