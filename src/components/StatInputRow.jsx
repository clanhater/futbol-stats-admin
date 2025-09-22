// src/components/StatInputRow.jsx

function StatInputRow({ player, stats, onStatChange }) {
  const handleChange = (field, value) => {
    // Convertir a número y asegurarse de que no sea negativo
    const numericValue = Math.max(0, parseInt(value, 10) || 0);
    onStatChange(player.id, field, numericValue);
  };

  return (
    <tr className="bg-gray-700 border-b border-gray-600">
      <td className="px-6 py-4 font-bold text-lg whitespace-nowrap">
        {player.nickname}
      </td>
      <td className="px-2 py-2">
        <input
          type="number"
          min="0"
          value={stats.wins}
          onChange={(e) => handleChange('wins', e.target.value)}
          className="w-20 bg-gray-600 text-white text-center p-2 rounded"
        />
      </td>
      <td className="px-2 py-2">
        <input
          type="number"
          min="0"
          value={stats.losses}
          onChange={(e) => handleChange('losses', e.target.value)}
          className="w-20 bg-gray-600 text-white text-center p-2 rounded"
        />
      </td>
      <td className="px-2 py-2">
        <input
          type="number"
          min="0"
          value={stats.goals}
          onChange={(e) => handleChange('goals', e.target.value)}
          className="w-20 bg-gray-600 text-white text-center p-2 rounded"
        />
      </td>
      <td className="px-2 py-2">
        <input
          type="number"
          min="0"
          value={stats.assists}
          onChange={(e) => handleChange('assists', e.target.value)}
          className="w-20 bg-gray-600 text-white text-center p-2 rounded"
        />
      </td>
    </tr>
  );
}

export default StatInputRow;