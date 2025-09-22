import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import Avatar from '../components/Avatar';
import StatInputControl from '../components/StatInputControl';

function PlayerDailyStatsPage() {
  const { date, playerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate } = location.state || {};
  
  const [playerInfo, setPlayerInfo] = useState(null);
  const [stats, setStats] = useState({ wins: 0, losses: 0, goals: 0, assists: 0 });
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDays, setPendingDays] = useState([]);

  // Efecto para cargar toda la información de la página al entrar
  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true);
        const [playerRes, dailyStatsRes] = await Promise.all([
          apiClient.get('/clasificacion'),
          apiClient.get(`/jornada/${date}/player/${playerId}`)
        ]);

        const currentPlayer = playerRes.data.find(p => p.id == playerId);
        setPlayerInfo(currentPlayer);
        
        const existingStats = dailyStatsRes.data;
        if (existingStats) {
          setStats({
            wins: existingStats.games_won,
            losses: existingStats.games_lost,
            goals: existingStats.goals,
            assists: existingStats.assists
          });
          setIsReadOnly(true);
        } else {
          setIsReadOnly(false);
        }
      } catch (error) {
        console.error("Error al cargar datos de la página:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, [date, playerId]);

  // --- INICIO DE LA LÓGICA DESCOMENTADA ---
  // Efecto para comprobar si el jugador tiene días anteriores pendientes de registro
  useEffect(() => {
    const checkPendingDays = async () => {
      if (!startDate) return; // No hacer nada si la fecha de inicio no ha cargado

      const today = new Date(date);
      const start = new Date(startDate);
      const daysToCheck = [];
      
      // Comprobamos hasta 5 días atrás, pero nunca antes de la fecha de inicio
      for (let i = 1; i <= 5; i++) {
        const prevDay = new Date(today);
        prevDay.setDate(today.getDate() - i);
        
        if (prevDay < start) {
          break; // Detenemos la búsqueda si llegamos antes de la fecha de inicio
        }
        
        daysToCheck.push(prevDay.toISOString().split('T')[0]);
      }

      if (daysToCheck.length === 0) return;

      const pending = [];
      for (const day of daysToCheck) {
        try {
          const response = await apiClient.get(`/jornada/status/${day}`);
          const playerStatus = response.data.find(p => p.player_id == playerId);
          if (playerStatus && playerStatus.status === 'pendiente') {
            pending.push(day);
          }
        } catch (error) {
          console.error(`Error comprobando el estado del día ${day}`, error);
        }
      }
      setPendingDays(pending);
    };

    checkPendingDays();
  }, [date, playerId, startDate]);
  // --- FIN DE LA LÓGICA DESCOMENTADA ---

  const handleStatChange = (field, increment) => {
    if (isReadOnly) return;
    setStats(prev => ({ ...prev, [field]: Math.max(0, prev[field] + increment) }));
  };

  const handleSave = async (isAbsent = false) => {
    setIsSubmitting(true);
    const finalStats = isAbsent 
      ? { wins: 0, losses: 0, goals: 0, assists: 0 } 
      : stats;

    const payload = {
      date: date,
      stats: [{ player_id: parseInt(playerId), ...finalStats }]
    };

    try {
      await apiClient.post('/jornada/registrar', payload);
      alert('¡Estadísticas guardadas con éxito!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ocurrió un error inesperado.';
      alert(`Error al guardar: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="relative z-10 max-w-2xl mx-auto text-white p-4">
        {/* Esqueleto de la Cabecera */}
        <div className="text-center mb-10 animate-pulse">
          <div className="w-28 h-28 mx-auto mb-4 bg-slate-700 rounded-full"></div>
          <div className="h-10 w-48 mx-auto bg-slate-700 rounded"></div>
          <div className="h-6 w-32 mx-auto bg-slate-700 rounded mt-2"></div>
        </div>

        {/* Esqueleto del Contenedor de Controles */}
        <div className="bg-slate-800/50 p-8 rounded-2xl animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Esqueleto de un StatInputControl (repetido 4 veces) */}
            <div className="text-center">
              <div className="h-5 w-3/4 mx-auto bg-slate-700 rounded mb-2"></div>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
                <div className="h-12 w-20 bg-slate-700 rounded"></div>
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="h-5 w-3/4 mx-auto bg-slate-700 rounded mb-2"></div>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
                <div className="h-12 w-20 bg-slate-700 rounded"></div>
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="h-5 w-3/4 mx-auto bg-slate-700 rounded mb-2"></div>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
                <div className="h-12 w-20 bg-slate-700 rounded"></div>
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="h-5 w-3/4 mx-auto bg-slate-700 rounded mb-2"></div>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
                <div className="h-12 w-20 bg-slate-700 rounded"></div>
                <div className="h-12 w-12 bg-slate-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Esqueleto de los Botones de Acción */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          <div className="h-16 w-full bg-slate-700 rounded-lg"></div>
          <div className="h-16 w-full bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (!playerInfo) return <div className="text-center p-10 text-white">Jugador no encontrado.</div>;

  return (
    <div className="relative z-10 max-w-2xl mx-auto text-white p-4">
      <div className="text-center mb-10">
        <Avatar type={playerInfo.avatar_type} value={playerInfo.avatar_value} className="w-28 h-28 mx-auto mb-4" />
        <h1 className="text-4xl font-bold">{playerInfo.nickname}</h1>
        <p className="text-lg text-gray-400">Registrando para el {date}</p>
      </div>
      
      {/* Alerta de días pendientes ahora es funcional */}
      {pendingDays.length > 0 && (
        <div className="bg-orange-500/20 border border-orange-500 text-orange-300 p-4 rounded-lg mb-6">
          <p className="font-bold">⚠️ ¡Atención!</p>
          <p>Parece que faltan las estadísticas de este jugador para los siguientes días:</p>
          <ul className="list-disc list-inside mt-2">
            {pendingDays.map(day => (
              <li key={day}>
                <Link to={`/jornada/${day}/jugador/${playerId}`} state={{ startDate: startDate }} className="underline hover:text-orange-100">
                  {day}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        {isReadOnly && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl z-20 cursor-not-allowed">
            <p className="text-2xl font-bold transform -rotate-12 border-4 border-yellow-400 text-yellow-400 p-4">
              🔒 REGISTRADO
            </p>
          </div>
        )}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-10 ${isReadOnly ? 'opacity-50' : ''}`}>
          <StatInputControl label="Partidos Ganados" value={stats.wins} onIncrement={() => handleStatChange('wins', 1)} onDecrement={() => handleStatChange('wins', -1)} />
          <StatInputControl label="Partidos Perdidos" value={stats.losses} onIncrement={() => handleStatChange('losses', 1)} onDecrement={() => handleStatChange('losses', -1)} />
          <StatInputControl label="Goles" value={stats.goals} onIncrement={() => handleStatChange('goals', 1)} onDecrement={() => handleStatChange('goals', -1)} />
          <StatInputControl label="Asistencias" value={stats.assists} onIncrement={() => handleStatChange('assists', 1)} onDecrement={() => handleStatChange('assists', -1)} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleSave(true)}
          disabled={isReadOnly || isSubmitting}
          className="w-full bg-red-600/80 hover:bg-red-600 border border-red-500 text-white font-bold py-4 px-4 rounded-lg text-lg transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? '...' : 'Marcar como Ausente'}
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={isReadOnly || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-lg text-lg transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Estadísticas'}
        </button>
      </div>
      
      <Link to="/" className="text-gray-400 hover:underline mt-6 w-full text-center block">
        &larr; Volver a la selección
      </Link>
    </div>
  );
}

export default PlayerDailyStatsPage;