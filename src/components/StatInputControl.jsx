// src/components/StatInputControl.jsx
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

function StatInputControl({ label, value, onDecrement, onIncrement }) {
  return (
    <div className="text-center">
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={onDecrement}
          className="p-3 rounded-full bg-slate-600 hover:bg-slate-500 text-white transition-colors disabled:opacity-50"
          disabled={value <= 0}
        >
          <MinusIcon className="h-6 w-6" />
        </button>
        <span className="text-5xl font-bold w-20 text-center">{value}</span>
        <button
          onClick={onIncrement}
          className="p-3 rounded-full bg-slate-600 hover:bg-slate-500 text-white transition-colors"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default StatInputControl;