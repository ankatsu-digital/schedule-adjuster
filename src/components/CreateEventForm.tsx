import { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

export const CreateEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState(['']);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { createEvent } = useFirestore();
  const navigate = useNavigate();

  const handleAddDate = () => {
    setDates([...dates, '']);
  };

  const handleRemoveDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventId = await createEvent({
        title,
        description,
        location,
        dates: dates.filter(d => d.trim() !== ''),
        adminPassword,
      });

      navigate(`/event/${eventId}`);
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('イベント作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">新しいイベントを作成</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">イベント名 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：チーム会議"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="イベントの詳細説明"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">場所</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：会議室A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">候補日時 *</label>
          {dates.map((date, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {dates.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDate(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  削除
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDate}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            日時を追加
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">管理者パスワード *</label>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="イベント編集用パスワード"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium"
        >
          {loading ? 'イベント作成中...' : 'イベントを作成'}
        </button>
      </form>
    </div>
  );
};
