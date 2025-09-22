// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import StatInputRow from '../components/StatInputRow'; // Importamos el nuevo componente

function AdminPage() {
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/clasificacion');
        setPlayers(response.data);
        const initialStats = {};
        response.data.forEach(player => {
          initialStats[player.id] = { wins: 0, losses: 0, goals: 0, assists: 0 };
        });
        setStats(initialStats);
        setError(null);
      } catch (err) {
        console.error("Error al cargar jugadores:", err);
        setError("No se pudo cargar la lista de jugadores. ¿Está el backend funcionando?");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // Función para manejar los cambios de los inputs de StatInputRow
  const handleStatChange = (playerId, field, value) => {
    setStats(prevStats => ({
      ...prevStats,
      [playerId]: {
        ...prevStats[playerId],
        [field]: value,
      }
    }));
  };

  // Función para enviar los datos al backend
  const handleSubmit = async () => {
    // 1. Filtrar solo los jugadores que participaron (que no tienen todo en cero)
    const participatingPlayersStats = Object.entries(stats)
      .map(([playerId, playerStats]) => ({
        player_id: parseInt(playerId, 10),
        ...playerStats
      }))
      .filter(p => p.wins > 0 || p.losses > 0 || p.goals > 0 || p.assists > 0);

    if (participatingPlayersStats.length === 0) {
      alert("No hay estadísticas que registrar. Introduce algún valor distinto de cero.");
      return;
    }

    // 2. Construir el payload para la API
    const payload = {
      date: sessionDate,
      stats: participatingPlayersStats
    };

    // 3. Enviar la petición
    setIsSubmitting(true);
    try {
      await apiClient.post('/jornada/registrar', payload);
      alert('¡Jornada registrada con éxito!');
      // Opcional: limpiar el formulario después de guardar
      // fetchPlayers(); // Podríamos llamar a fetchPlayers de nuevo para reiniciar
    } catch (err) {
      console.error("Error al registrar la jornada:", err);

      const errorMessage = err.response?.data?.message || 'Ocurrió un error inesperado.';
      alert(`Error al guardar: ${errorMessage}`); // Usamos el mensaje de la API

    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) return <div className="text-center p-10">Cargando jugadores...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <label htmlFor="sessionDate" className="block text-xl font-bold mb-2">Fecha de la Jornada</label>
        <input type="date" id="sessionDate" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-lg rounded-lg p-2.5" />
      </div>

      {/* Tabla de estadísticas */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-600 font-medium">
            <tr>
              <th scope="col" className="px-6 py-4">Jugador</th>
              <th scope="col" className="px-2 py-4">Ganados</th>
              <th scope="col" className="px-2 py-4">Perdidos</th>
              <th scope="col" className="px-2 py-4">Goles</th>
              <th scope="col" className="px-2 py-4">Asistencias</th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <StatInputRow
                key={player.id}
                player={player}
                stats={stats[player.id] || {}} // Pasar las stats para este jugador
                onStatChange={handleStatChange} // Pasar la función para manejar cambios
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting} // Deshabilitar el botón mientras se envía
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar y Procesar Jornada'}
        </button>
      </div>
    </div>
  );
}

export default AdminPage;