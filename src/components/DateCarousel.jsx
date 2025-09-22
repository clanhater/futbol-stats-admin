// src/components/DateCarousel.jsx
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

function DateCarousel({ selectedDate, setDate, minDate, maxDate }) {
  // Si las fechas mínimas o máximas no están listas, no renderizar nada para evitar errores
  if (!minDate || !maxDate) {
    return null; 
  }

  const date = new Date(selectedDate + 'T12:00:00Z');
  const min = new Date(minDate + 'T12:00:00Z');
  const max = new Date(maxDate + 'T12:00:00Z');

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);

    if (newDate >= min && newDate <= max) {
      setDate(newDate.toISOString().split('T')[0]);
    }
  };

  const formatDate = (d) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const checkDate = new Date(d);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate.getTime() === today.getTime()) return 'Hoy';
    if (checkDate.getTime() === yesterday.getTime()) return 'Ayer';
    
    return d.toLocaleString('es-ES', { day: 'numeric', month: 'long' });
  };
  
  const isMinDate = date.getTime() <= min.getTime();
  const isMaxDate = date.getTime() >= max.getTime();

  return (
    <div className="flex items-center justify-center space-x-4 sm:space-x-6 my-8">
      <button 
        onClick={() => changeDate(-1)} 
        disabled={isMinDate} 
        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      
      <div className="text-center w-48">
        <p className="text-3xl md:text-4xl font-bold tracking-tight text-white">{formatDate(date)}</p>
        <p className="text-sm text-gray-400">{date.getFullYear()}</p>
      </div>

      <button 
        onClick={() => changeDate(1)} 
        disabled={isMaxDate} 
        className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

export default DateCarousel;