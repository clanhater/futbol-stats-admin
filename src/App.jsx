// src/App.jsx
import AdminPage from './pages/AdminPage'; // Importar la página

function App() {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <h1 className="text-center text-3xl p-4 font-bold bg-gray-900">Panel de Admin - Futbol Stats</h1>
      <AdminPage />
    </div>
  )
}

export default App;