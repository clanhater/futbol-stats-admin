import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import PlayerProfileCard from '../components/PlayerProfileCard';
import DateCarousel from '../components/DateCarousel';
import DateCarouselSkeleton from '../components/DateCarouselSkeleton';
import PlayerProfileCardSkeleton from '../components/PlayerProfileCardSkeleton';

function AdminPage() {
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [players, setPlayers] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPageData = useCallback(async (date) => {
    try {
      setLoading(true);
      setError(null);
      const calls = [
        apiClient.get('/clasificacion'),
        apiClient.get(`/jornada/status/${date}`)
      ];
      if (!startDate) {
        calls.push(apiClient.get('/jornada/settings'));
      }
      const [playersRes, statusRes, settingsRes] = await Promise.all(calls);
      
      setPlayers(playersRes.data);
      if (settingsRes) setStartDate(settingsRes.data.start_date);

      const statusMap = statusRes.data.reduce((acc, item) => {
        acc[item.player_id] = item.status;
        return acc;
      }, {});
      setStatuses(statusMap);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [startDate]);

  useEffect(() => {
    fetchPageData(sessionDate);
  }, [sessionDate, fetchPageData]);

  const handleDateChange = (newDate) => {
    setSessionDate(newDate);
  };

  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {loading ? (
        <DateCarouselSkeleton />
      ) : (
        <DateCarousel 
          selectedDate={sessionDate}
          setDate={handleDateChange}
          minDate={startDate?.split('T')[0]}
          maxDate={new Date().toISOString().split('T')[0]}
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => <PlayerProfileCardSkeleton key={index} />)
        ) : (
          players.map(player => (
            <PlayerProfileCard
              key={player.id}
              player={player}
              status={statuses[player.id] || 'pendiente'}
              date={sessionDate}
              startDate={startDate}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPage;