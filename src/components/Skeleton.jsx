// src/components/Skeleton.jsx

function Skeleton({ className }) {
  return (
    <div className={`bg-slate-700 rounded animate-pulse ${className}`}></div>
  );
}

export default Skeleton;