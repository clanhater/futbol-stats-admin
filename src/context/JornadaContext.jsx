// src/context/JornadaContext.jsx
import { createContext, useState } from 'react';

// 1. Crear el contexto
export const JornadaContext = createContext();

// 2. Crear el Proveedor del contexto
export function JornadaProvider({ children }) {
  // El estado principal: un objeto que guardará las stats de cada jugador para la jornada actual
  // La clave será el ID del jugador, y el valor será un objeto con sus stats y estado.
  const [jornadaStats, setJornadaStats] = useState({});

  // Función para actualizar o añadir las stats de un jugador
  const updatePlayerStats = (playerId, newStats) => {
    setJornadaStats(prevStats => ({
      ...prevStats,
      [playerId]: {
        ...prevStats[playerId], // Mantener datos previos si existen
        ...newStats,           // Sobrescribir con los nuevos datos
      },
    }));
  };

  // Función para marcar a un jugador como ausente
  const markPlayerAsAbsent = (playerId) => {
    updatePlayerStats(playerId, {
      status: 'ausente',
      wins: 0,
      losses: 0,
      goals: 0,
      assists: 0,
    });
  };

  // Función para limpiar todos los datos al cambiar de día o al guardar
  const resetJornada = () => {
    setJornadaStats({});
  };

  // El valor que compartiremos con toda la aplicación
  const value = {
    jornadaStats,
    updatePlayerStats,
    markPlayerAsAbsent,
    resetJornada
  };

  return (
    <JornadaContext.Provider value={value}>
      {children}
    </JornadaContext.Provider>
  );
}