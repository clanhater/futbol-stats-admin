// src/components/Avatar.jsx

// Definimos los íconos disponibles. Puedes añadir más cuando quieras.
const AVATARS = {
  default: '👤',
  lion: '🦁',
  wall: '🧱',
  wizard: '🧙',
  rocket: '🚀',
  bomb: '💣',
  goal: '⚽',
  king_avatar: '👑', // Añadimos los de la tienda
  alien_avatar: '👽',
};

// La URL base de tu backend, para construir la ruta completa de las imágenes
const API_URL = 'https://futbol-stats-backend.vercel.app'; // <-- ¡IMPORTANTE! Reemplaza esto

function Avatar({ type, value, className = '' }) {
  const containerClasses = `flex items-center justify-center bg-gray-600 dark:bg-gray-700 rounded-full overflow-hidden ${className}`;
  
  // Si el avatar es una imagen, mostramos la etiqueta <img>
  if (type === 'image' && value) {
    // value contendrá algo como '/uploads/avatar-1234.jpg'
    // La URL completa será 'https://tu-backend.vercel.app/uploads/avatar-1234.jpg'
    return (
      <div className={containerClasses}>
        <img src={`${API_URL}${value}`} alt="Avatar del jugador" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Si no, es un ícono. Mostramos el emoji correspondiente.
  // Usamos 'AVATARS[value] || AVATARS.default' para mostrar el ícono por defecto si el valor no se encuentra.
  return (
    <div className={containerClasses}>
      <span className="text-4xl">{AVATARS[value] || AVATARS.default}</span>
    </div>
  );
}

export default Avatar;