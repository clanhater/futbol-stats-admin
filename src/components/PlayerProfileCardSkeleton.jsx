function PlayerProfileCardSkeleton() {
  return (
    // Usamos la misma estructura y clases que la tarjeta real
    <div className="relative h-full bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg">
      <div className="animate-pulse p-4 flex flex-col items-center justify-center gap-3 h-full">
        <div className="w-24 h-24 bg-slate-700 rounded-full"></div>
        <div className="h-6 w-3/4 bg-slate-700 rounded-md"></div>
      </div>
    </div>
  );
}
export default PlayerProfileCardSkeleton;