// src/App.jsx
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // 1. Importar AnimatePresence
import AdminPage from './pages/AdminPage';
import PlayerDailyStatsPage from './pages/PlayerDailyStatsPage';
import AnimatedPage from './components/AnimatedPage'; // 2. Importar nuestro wrapper de animación

// Creamos un componente interno para poder usar el hook useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // 3. Envolvemos el <Routes> con <AnimatePresence>
    // El prop 'mode="wait"' espera a que la animación de salida termine antes de empezar la de entrada
    <AnimatePresence mode="wait">
      {/* 4. Usamos location.key para que AnimatePresence detecte el cambio de ruta */}
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <AnimatedPage>
              <AdminPage />
            </AnimatedPage>
          } 
        />
        <Route 
          path="/jornada/:date/jugador/:playerId" 
          element={
            <AnimatedPage>
              <PlayerDailyStatsPage />
            </AnimatedPage>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl opacity-50"></div>
        
        <div className="relative z-10">
          <h1 className="text-center text-3xl p-4 font-bold bg-black/20 backdrop-blur-sm">
            Panel de Admin - Futbol Stats
          </h1>
          <AnimatedRoutes /> {/* 5. Usamos nuestro nuevo componente de rutas animadas */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;