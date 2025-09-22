import { Link } from 'react-router-dom';
import Avatar from './Avatar';

function PlayerProfileCard({ player, status, date, startDate }) {
  const statusStyles = {
    registrado: 'bg-green-500',
    pendiente: 'bg-orange-500',
    ausente: 'bg-red-500',
  };

  return (
    <Link to={`/jornada/${date}/jugador/${player.id}`} state={{ startDate: startDate }}>
      <div 
        className="relative h-full bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden
                   border border-white/10 hover:border-blue-400
                   shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <div className="p-4 flex flex-col items-center justify-center gap-3 h-full">
          <Avatar type={player.avatar_type} value={player.avatar_value} className="w-24 h-24" />
          <h3 className="text-lg font-bold text-white text-center">{player.nickname}</h3>
        </div>
        <div 
          className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 border-slate-800 ${statusStyles[status] || 'bg-gray-400'}`}
          title={`Estado: ${status}`}
        ></div>
      </div>
    </Link>
  );
}

export default PlayerProfileCard;